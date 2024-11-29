import React, { useState } from 'react';
import { Box, Container, TextField, Button, Typography } from '@mui/material';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

const zoomInOut = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const regex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    return regex.test(password);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setIsPasswordValid(validatePassword(value));
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setPasswordsMatch(value === password);
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!isPasswordValid) {
      setError('Password must be at least 8 characters long and contain a special character');
      return;
    }

    setError('');
    navigate('/login');
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
        <Typography
          variant="h4"
          sx={{
            marginBottom: '2rem',
            color: '#333',
            textAlign: 'center',
            animation: `${zoomInOut} 3s infinite ease-in-out`,
          }}
        >
          Register
        </Typography>

        <form onSubmit={handleRegister} style={{ width: '100%' }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{
              marginBottom: '1rem',
              backgroundColor: '#fff',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#333',
                },
                '&:hover fieldset': {
                  borderColor: '#555',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#777',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#333',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#555',
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={handlePasswordChange}
            sx={{
              marginBottom: '1rem',
              backgroundColor: '#fff',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#333',
                },
                '&:hover fieldset': {
                  borderColor: '#555',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#777',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#333',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#555',
              },
            }}
            helperText={
              !isPasswordValid &&
              'Password must be at least 8 characters long and contain a special character.'
            }
            error={!isPasswordValid}
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            sx={{
              marginBottom: '1rem',
              backgroundColor: '#fff',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#333',
                },
                '&:hover fieldset': {
                  borderColor: '#555',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#777',
                },
              },
              '& .MuiInputLabel-root': {
                color: '#333',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#555',
              },
            }}
            helperText={!passwordsMatch && 'Passwords do not match.'}
            error={!passwordsMatch}
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
            Register
          </Button>
        </form>
      </Container>
    </Box>
  );
}

export default Register;
