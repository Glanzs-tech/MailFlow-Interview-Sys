import React, { useState, useEffect } from 'react';

const SendEmail = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(storedContacts);
  }, []);

  const handleSend = () => {
    if (!selectedEmail || !subject.trim() || !body.trim()) {
      alert('Please fill all fields and select a contact.');
      return;
    }

    console.log('Sending email to:', selectedEmail);
    console.log('Subject:', subject);
    console.log('Body:', body);

    alert('Email sent successfully!');
    setSelectedEmail('');
    setSubject('');
    setBody('');
  };

  const styles = {
    container: { maxWidth: '600px', margin: 'auto', padding: '20px', textAlign: 'center' },
    input: { padding: '10px', margin: '10px 0', width: '90%' },
    select: { padding: '10px', margin: '10px 0', width: '95%' },
    button: { padding: '10px 20px', backgroundColor: '#4CAF50', color: '#fff', border: 'none', cursor: 'pointer' }
  };

  return (
    <div style={styles.container}>
      <h2>📤 Send Email</h2>

      <select style={styles.select} value={selectedEmail} onChange={(e) => setSelectedEmail(e.target.value)}>
        <option value="">-- Select Contact --</option>
        {contacts.map((contact, idx) => (
          <option key={idx} value={contact.email}>
            {contact.name} ({contact.email})
          </option>
        ))}
      </select>

      <input
        style={styles.input}
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />
      <textarea
        style={{ ...styles.input, height: '100px' }}
        placeholder="Email body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <br />
      <button style={styles.button} onClick={handleSend}>📨 Send Email</button>
    </div>
  );
};

export default SendEmail;
