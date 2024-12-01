import React from 'react';
import { Box, Typography } from '@mui/material';
import styles from './Home.module.css';

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
      <Typography
        variant="h3"
        sx={{
          fontWeight: 'bold',
          fontSize: '2.5rem',
          color: '#333',
          marginBottom: '1rem',
        }}
        className={styles.pulsingText} 
      >
        Welcome to Phonebook App
      </Typography>
      <Typography       
        sx={{
          fontWeight: '600',
          color: '#6600cc',
        }}>
      A place to store your contacts. Made with <span className={styles.heart}>❤️</span> by Rebeca Lăsconi
          </Typography>
    </Box>
  );
};

export default Home;

