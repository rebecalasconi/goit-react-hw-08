import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/auth/authSlice';
import { Container, Box, Button, Typography } from '@mui/material';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import Contacts from '../../pages/ContactsPage';

const App = () => {
  const dispatch = useDispatch();

  // Check if a token is already stored in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = JSON.parse(localStorage.getItem('user'));
      dispatch(loginSuccess({ user, token }));
    }
  }, [dispatch]);

  return (
      <Container>
        <Box sx={{ textAlign: 'center', margin: '2rem',
        background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(166,205,252,1) 100%)',
        padding: '2rem', }}>
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
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </Container>
  );
};

export default App;
