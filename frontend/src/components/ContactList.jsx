import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ContactList = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) || [];
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Save contacts to localStorage on any change
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const isEmailValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleAddContact = () => {
    if (!name.trim() || !email.trim()) {
      alert('Name and email are required.');
      return;
    }

    if (!isEmailValid(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    if (contacts.some(contact => contact.email === email)) {
      alert('This email is already in your contact list.');
      return;
    }

    const newContact = { name, email };
    setContacts([...contacts, newContact]);
    setName('');
    setEmail('');
    alert('Contact added successfully!');
  };

  const handleDeleteContact = (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
  };

  const styles = {
    container: {
      maxWidth: '500px',
      margin: 'auto',
      padding: '20px',
      textAlign: 'center'
    },
    input: {
      padding: '10px',
      margin: '10px 5px',
      width: '80%'
    },
    button: {
      padding: '10px 20px',
      margin: '10px',
      cursor: 'pointer'
    },
    contactCard: {
      backgroundColor: '#000000ff',
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '10px',
      marginBottom: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    deleteBtn: {
      backgroundColor: '#f44336',
      color: '#fff',
      border: 'none',
      padding: '5px 10px',
      borderRadius: '4px',
      cursor: 'pointer'
    },
    backBtn: {
      marginTop: '20px',
      backgroundColor: '#1976d2',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '4px',
      cursor: 'pointer'
    }
  };

  return (
    <div style={styles.container}>
      <h2>📇 Contact List</h2>

      <input
        style={styles.input}
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        style={styles.input}
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />

      <button
        style={{ ...styles.button, backgroundColor: '#4CAF50', color: 'white' }}
        onClick={handleAddContact}
      >
        ➕ Add Contact
      </button>

      <div>
        <h3 style={{ marginTop: '30px' }}>Saved Contacts</h3>
        {contacts.length === 0 ? (
          <p>No contacts added yet.</p>
        ) : (
          contacts.map((contact, index) => (
            <div key={index} style={styles.contactCard}>
              <div>
                <strong>{contact.name}</strong><br />
                <span>{contact.email}</span>
              </div>
              <button
                style={styles.deleteBtn}
                onClick={() => handleDeleteContact(index)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      <button
        style={styles.backBtn}
        onClick={() => navigate('/dashboard')}
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default ContactList;
