import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, removeContact } from '../redux/contacts/contactsSlice';
import {TextField, List, ListItem, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ContactForm from '../components/ContactForm';
import { useNavigate } from 'react-router-dom';
import UserMenu from 'components/Navigation/UserMenu';

const ContactsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const contacts = useSelector((state) => state.contacts.items);
  const filter = useSelector((state) => state.contacts.filter);
  const [filteredContacts, setFilteredContacts] = useState(contacts);

  useEffect(() => {
    if (filter) {
      setFilteredContacts(
        contacts.filter((contact) =>
          contact.name.toLowerCase().includes(filter.toLowerCase())
        )
      );
    } else {
      setFilteredContacts(contacts);
    }
  }, [contacts, filter]);

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('You are not authenticated.');

      const response = await fetch(`https://connections-api.goit.global/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete contact');

      dispatch(removeContact(id));
    } catch (err) {
      console.error(err.message);
    }
  };



  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto',
      background: 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(166,205,252,1) 100%)',
      padding: ' 4rem 22rem', }}>

      <Typography variant="h4" align="center" marginBottom="50px" gutterBottom>
        Contact Manager
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <TextField
          label="Filter contacts"
          variant="outlined"
          value={filter}
          onChange={handleFilterChange}
          fullWidth
        />
      <UserMenu />
      </div>
      <ContactForm />
      <List>
        {filteredContacts.map((contact) => (
          <ListItem
            key={contact.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              border: '1px solid #ddd',
              borderRadius: '5px',
              marginBottom: '0.5rem',
              padding: '0.5rem 1rem',
            }}
          >
            <Typography variant="body1">
              {contact.name} - {contact.number}
            </Typography>
            <IconButton
              aria-label="delete"
              onClick={() => handleDelete(contact.id)}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ContactsPage;
