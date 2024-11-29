import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Switch } from '@mui/material';
import { Link } from 'react-router-dom';

function Navigation({ darkMode, toggleTheme }) { 
  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundImage: 'url(https://unsplash.com/photos/a-blue-and-red-object-with-lines-coming-out-of-it-fQVoDe03HoA) no-repeat center center',
        backgroundSize: 'contain',
        boxShadow: 'none',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        zIndex: 1000,
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1.5rem 2.5rem',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          height: '100%'
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontFamily: 'Pacifico, cursive',  
              fontSize: '2rem',            
              color: '#fff',                 
              fontWeight: '700',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              textAlign: 'center'
            }}
          >
            Phonebook App
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ marginRight: '8px' }}>Dark Mode</Typography>
          <Switch
            checked={darkMode} 
            onChange={toggleTheme} 
            color="default"
          />
        </Box>

        <Box>
          <Button
            component={Link}
            to="/login"
            sx={{
              color: 'white',
              fontFamily: 'Roboto, sans-serif',
              fontWeight: '500',
              margin: '0 1rem',
              textTransform: 'uppercase',
              fontSize: '0.9rem',
              borderRadius: '50px',
              padding: '0.6rem 2rem',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              transition: 'background-color 0.3s ease, transform 0.3s ease',
              '&:hover': {
                backgroundColor: '#03a9f4',
                transform: 'scale(1.05)',
              },
            }}
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/register"
            sx={{
              color: 'white',
              fontFamily: 'Roboto, sans-serif',
              fontWeight: '500',
              margin: '0 1rem',
              textTransform: 'uppercase',
              fontSize: '0.9rem',
              borderRadius: '50px',
              padding: '0.6rem 2rem',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              transition: 'background-color 0.3s ease, transform 0.3s ease',
              '&:hover': {
                backgroundColor: '#4caf50',
                transform: 'scale(1.05)',
              },
            }}
          >
            Register
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;