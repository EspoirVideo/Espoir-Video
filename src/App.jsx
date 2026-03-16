import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login'; // Nouvel import

// Composant temporaire (sera remplace a la Vague 4)
const HomePlaceholder = () => (
  <div className="text-center py-20">
    <h1 className="text-4xl font-bold mb-4 text-textMain">Catalogue des Films</h1>
    <p className="text-textMuted">Les films depuis le backend s'afficheront ici.</p>
  </div>
);

// Composant de protection des routes
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div className="flex justify-center items-center h-64 text-primary">Chargement...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Route publique */}
        <Route path="/" element={<HomePlaceholder />} />
        
        {/* Route de connexion */}
        <Route path="/login" element={<Login />} />
        
        {/* Exemple de route protegee pour plus tard */}
        <Route 
          path="/watch/:id" 
          element={
            <ProtectedRoute>
              <div>Lecteur Video (Protege)</div>
            </ProtectedRoute>
          } 
        />
      </Route>
    </Routes>
  );
};

export default App;