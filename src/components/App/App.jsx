import React, { useState, createContext } from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Register from '../Auth/Register'; 
import PrivateRoute from 'components/PrivateRoute';
import Login from '../Auth/Login'; 
import Home from '../../pages/Home';
import Contacts from '../../pages/ContactsPage'; 


const AuthContext = createContext();

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      <Box
        sx={{
          background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(166,205,252,1) 100%)',
          minHeight: '100vh',
          paddingBottom: '4rem', 
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contacts" element={<PrivateRoute element={<Contacts />} />} />
          <Route path="*" element={<Typography>404 - Page Not Found</Typography>} />
        </Routes>
        <Container sx={{ padding: '2rem', textAlign: 'center', marginTop: '-80px' }}>
          <Box sx={{ marginBottom: '2rem' }}>
            {!isAuthenticated ? (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ margin: '0.5rem' }}
                  component={Link}
                  to="/register"
                >
                  Register
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ margin: '0.5rem' }}
                  component={Link}
                  to="/login"
                >
                  Login
                </Button>
              </>
            ) : (
              <Button
                variant="contained"
                color="warning"
                sx={{ margin: '0.5rem' }}
                onClick={logout}
              >
                Logout
              </Button>
            )}
          </Box>
        </Container>
        <Box
          sx={{
            position: 'absolute',
            top: '57rem',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '1.5rem',
          }}
        >
        </Box>
      </Box>
    </AuthContext.Provider>
  );
}

export default App;
