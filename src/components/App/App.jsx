import React, { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/auth/authSlice';
import { Container, Box, Button, Typography } from '@mui/material';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import Contacts from '../../pages/ContactsPage';
import PrivateRoute from 'components/PrivateRoute';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (token && user) {
      dispatch(loginSuccess({ user: JSON.parse(user), token }));
    }
  }, [dispatch]); // se rulează doar la montare și actualizare a stării
  

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      console.log('token is:', token);
      console.log('user is:', user);
      if (token && user) {
        dispatch(loginSuccess({ user: JSON.parse(user), token }));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [dispatch]);

  return (
    <Container>
      <Box
        sx={{
          textAlign: 'center',
          margin: '2rem',
          background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(166,205,252,1) 100%)',
          padding: '2rem',
        }}
      >
        <Typography variant="h3" color="primary">
          Phonebook App
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: '1rem', marginRight: '1rem' }}
          component={Link}
          to="/login"
        >
          Login
        </Button>
        <Button
          variant="outlined"
          sx={{ marginTop: '1rem' }}
          component={Link}
          to="/register"
        >
          Register
        </Button>
      </Box>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contacts" element={<PrivateRoute element={<Contacts />} />} />
        <Route path="*" element={<Typography>404 - Page Not Found</Typography>} />
      </Routes>
    </Container>
  );
};

export default App;
