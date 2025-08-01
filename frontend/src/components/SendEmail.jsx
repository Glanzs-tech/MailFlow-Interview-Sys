import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const SendEmail = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setContacts(storedContacts);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleEmail = (email) => {
    setSelectedEmails((prev) =>
      prev.includes(email) ? prev.filter((e) => e !== email) : [...prev, email]
    );
  };

  const handleSend = () => {
    if (selectedEmails.length === 0 || !subject.trim() || !body.trim()) {
      alert('Please fill all fields and select at least one contact.');
      return;
    }

    console.log('Sending to:', selectedEmails);
    console.log('Subject:', subject);
    console.log('Body:', body);

    alert('Email sent successfully!');
    setSelectedEmails([]);
    setSubject('');
    setBody('');
  };

const handleGenerateAI = async () => {
  const recipient = selectedEmails.join(', ');

  if (!recipient || !subject.trim()) {
    alert('Recipient and Subject are required for AI email generation.');
    return;
  }

  const prompt = `Write a professional marketing email to ${recipient} with the subject "${subject}". Make it concise and persuasive.`;

  setLoadingAI(true);

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/ai/generate-email`,
      { prompt }, // 🔁 Now sending the correct key
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    setBody(response.data.content); // ✅ Matches backend response
  } catch (error) {
    console.error('AI Generation Error:', error?.response?.data || error.message);
    alert('Failed to generate email using AI.');
  } finally {
    setLoadingAI(false);
  }
};


  const styles = {
    container: { maxWidth: '600px', margin: 'auto', padding: '20px', textAlign: 'center' },
    input: {
      padding: '10px',
      margin: '10px 0',
      width: '90%',
      borderRadius: '4px',
      border: '1px solid #ccc',
      backgroundColor: '#1e1e1e',
      color: '#fff',
    },
    customSelect: {
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      width: '90%',
      margin: '10px auto',
      cursor: 'pointer',
      backgroundColor: '#1e1e1e',
      color: '#fff',
      textAlign: 'left',
    },
    dropdown: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      backgroundColor: '#1e1e1e',
      border: '1px solid #ccc',
      zIndex: 1000,
      maxHeight: '150px',
      overflowY: 'auto',
      width: '100%',
    },
    checkboxLabel: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '8px 10px',
      cursor: 'pointer',
      color: '#fff',
    },
    selectedText: {
      color: '#fff',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#4CAF50',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
      borderRadius: '4px',
      margin: '5px',
    },
    aiButton: {
      padding: '8px 16px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      cursor: 'pointer',
      borderRadius: '4px',
      marginBottom: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <h2>📤 Send Email</h2>

      <div style={{ position: 'relative' }} ref={dropdownRef}>
        <div style={styles.customSelect} onClick={() => setShowDropdown(!showDropdown)}>
          {selectedEmails.length > 0 ? (
            <span style={styles.selectedText}>{selectedEmails.join(', ')}</span>
          ) : (
            <span style={{ color: '#aaa' }}>Select recipient mail(s)</span>
          )}
        </div>

        {showDropdown && (
          <div style={styles.dropdown}>
            {contacts.map((contact, idx) => (
              <label key={idx} style={styles.checkboxLabel}>
                <span>
                  {contact.name} ({contact.email})
                </span>
                <input
                  type="checkbox"
                  checked={selectedEmails.includes(contact.email)}
                  onChange={() => handleToggleEmail(contact.email)}
                />
              </label>
            ))}
          </div>
        )}
      </div>

      <input
        style={styles.input}
        type="text"
        placeholder="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      />

      <button style={styles.aiButton} onClick={handleGenerateAI} disabled={loadingAI}>
        {loadingAI ? 'Generating...' : '⚡ Generate with AI'}
      </button>

      <textarea
        style={{ ...styles.input, height: '100px' }}
        placeholder="Email body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <br />
      <button style={styles.button} onClick={handleSend}>
        📨 Send Email
      </button>
    </div>
  );
};

export default SendEmail;
