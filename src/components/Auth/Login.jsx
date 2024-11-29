import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/auth/authSlice';
import { Box, Container, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // <-- Ensure this is from react-router-dom

function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // <-- useNavigate from react-router-dom

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make the login API call
      const response = await fetch('https://connections-api.goit.global/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const { token, user } = data;

        // Save the token and user data to localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        // Dispatch login success (if using Redux for state management)
        dispatch(loginSuccess({ user, token }));

        // Redirect to dashboard or contacts page
        navigate('/contacts'); // <-- use navigate to redirect
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        minHeight: '100vh',
        background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(166,205,252,1) 100%)',
        padding: '2rem',
      }}
    >
      <Container
        sx={{
          backgroundColor: 'rgba(255,255,255,0.9)',
          padding: '3rem',
          borderRadius: '8px',
          width: '60%',
          maxWidth: '400px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: '2rem' }}>
          Login
        </Typography>

        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: '1rem', backgroundColor: '#fff' }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: '1rem', backgroundColor: '#fff' }}
          />

          {error && (
            <Typography color="red" sx={{ marginBottom: '1rem' }}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              padding: '0.8rem',
              fontSize: '1.1rem',
              borderRadius: '4px',
              backgroundColor: '#0077cc',
              '&:hover': {
                backgroundColor: '#0055aa',
              },
              color: '#fff',
            }}
          >
            Login
          </Button>
        </form>
      </Container>
    </Box>
  );
}

export default Login;