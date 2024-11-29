const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());



// Portul pe care rulează serverul
const PORT = process.env.PORT || 3001;

// Endpoint pentru utilizatori
app.get('/users.json', (req, res) => {
  res.setHeader('Cache-Control', 'no-store'); 
  const filePath = path.join(__dirname, 'users.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Unable to read users.json' });
    }
    res.json(JSON.parse(data));
  });
});



app.post('/users.json', (req, res) => {
  const filePath = path.join(__dirname, 'users.json');
  const newUser = req.body;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Unable to read users.json' });
    }

    const users = JSON.parse(data);
    users.push(newUser);

    fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Unable to write to users.json' });
      }
      res.status(201).json({ message: 'User added successfully' });
    });
  });
});

// Endpoint pentru contacte
app.get('/contacts.json', (req, res) => {
  const filePath = path.join(__dirname, 'contacts.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Unable to read contacts.json' });
    }
    res.json(JSON.parse(data));
  });
});

app.post('/contacts.json', (req, res) => {
  const filePath = path.join(__dirname, 'contacts.json');
  const newContact = req.body;

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Unable to read contacts.json' });
    }

    const contacts = JSON.parse(data);
    contacts.push(newContact);

    fs.writeFile(filePath, JSON.stringify(contacts, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Unable to write to contacts.json' });
      }
      res.status(201).json({ message: 'Contact added successfully' });
    });
  });
});

// Pornirea serverului
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
