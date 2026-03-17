import axios from 'axios';

// --- SONDE DE DÉBOGAGE FRONTEND ---
console.log('=============================================');
console.log('[DEBUG VITE] Variable lue :', import.meta.env.VITE_API_URL);
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
console.log('[DEBUG VITE] URL finale utilisée par Axios :', baseURL);
console.log('=============================================');

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  // Log l'URL exacte de chaque requête sortante
  console.log(`[AXIOS OUT] Requete vers : ${config.baseURL}${config.url}`);
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  console.error('[API ERROR]', error.response?.data?.message || error.message);
  return Promise.reject(error);
});

export default api;