import React from 'react';
import { Box, Typography } from '@mui/material';
import styles from './Home.module.css'; // Importă fișierul CSS pentru stiluri personalizate

const Home = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(166,205,252,1) 100%)',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      {/* Titlu special cu animație */}
      <Typography
        variant="h3"
        sx={{
          fontWeight: 'bold',
          fontSize: '2.5rem',
          color: '#333',
          marginBottom: '1rem',
        }}
        className={styles.pulsingText} // Aplică clasa CSS pentru animație
      >
        Welcome to Phonebook App
      </Typography>
      <Typography>
      A place to store your contacts <span className={styles.heart}>❤️</span>
          </Typography>
    </Box>
  );
};

export default Home;

