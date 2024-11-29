import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../redux/contacts/contactsSlice';
import { Box, TextField, Button, Typography, FormControl, FormHelperText } from '@mui/material';

const ContactForm = ({ darkMode }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !number) {
      setError('Both name and number are required.');
      return;
    }

    const contactData = { name, number };

    const token = localStorage.getItem('token');
    if (!token) {
      setError('You are not authenticated.');
      return;
    }

    try {
      const response = await fetch('https://connections-api.goit.global/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(contactData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to add contact');
      }

      const newContact = await response.json();
      console.log('API response:', newContact);
      dispatch(addContact(newContact));

      setName('');
      setNumber('');
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '500px',
        margin: '0 auto',
        padding: '2rem',
        backgroundColor: darkMode ? 'rgba(0, 0, 30, 0.8)' : 'rgba(255, 255, 255, 0.9)', 
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography
        variant="h5"
        align="center"
        sx={{
          marginBottom: '1.5rem',
          color: darkMode ? '#003366' : '#003366', 
        }}
      >
        Add New Contact
      </Typography>

      {error && (
        <Typography variant="body2" color="error" sx={{ marginBottom: '1rem' }}>
          {error}
        </Typography>
      )}

      <form onSubmit={handleSubmit}>
        <FormControl fullWidth sx={{ marginBottom: '1rem' }} error={Boolean(error)}>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            fullWidth
            required
            sx={{
              marginBottom: '1rem',
              '& .MuiInputBase-root': {
                color: darkMode ? 'white' : 'black', 
              },
              '& .MuiInputLabel-root': {
                color: darkMode ? 'white' : '#333', 
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: darkMode ? 'white' : 'black', 
                },
              },
            }}
            placeholder="Name"
          />
          <TextField
            label="Phone Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            variant="outlined"
            fullWidth
            required
            sx={{
              marginBottom: '1.5rem',
              '& .MuiInputBase-root': {
                color: darkMode ? 'white' : 'black', 
              },
              '& .MuiInputLabel-root': {
                color: darkMode ? 'white' : '#333', 
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: darkMode ? 'white' : 'black', 
                },
              },
            }}
            placeholder="Phone Number"
          />
          <FormHelperText>{error && error}</FormHelperText>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            padding: '0.8rem',
            fontWeight: 'bold',
            backgroundColor: darkMode ? '#003366' : '#3399cc',
            '&:hover': {
              backgroundColor: darkMode ? '#002244' : '#006bb3', 
            },
          }}
        >
          Add Contact
        </Button>
      </form>
    </Box>
  );
};

export default ContactForm;
