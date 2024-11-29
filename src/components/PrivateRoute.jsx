import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('token'); // Verifică dacă există un token

  // Dacă nu există token, redirecționează la pagina de login
  return token ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;



