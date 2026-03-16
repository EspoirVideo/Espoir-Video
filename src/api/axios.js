import axios from 'axios';

const api = axios.create({
  // Pointe vers ton backend (local ou Render via le fichier .env)
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Intercepteur pour injecter le token a chaque requete sortante
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Intercepteur pour gerer les erreurs globalement (ex: token expire)
api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  console.error('[API ERROR]', error.response?.data?.message || error.message);
  // Si on recoit une 401 (Non autorise), on pourrait forcer la deconnexion ici
  return Promise.reject(error);
});

export default api;