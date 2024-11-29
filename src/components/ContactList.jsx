import React from 'react';
import { useSelector } from 'react-redux';

const ContactList = () => {
  const contacts = useSelector((state) => state.contacts.items);

  return (
    <ul>
      {contacts.map((contact) => (
        <li key={contact.id}>
          {contact.name} - {contact.number}
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
