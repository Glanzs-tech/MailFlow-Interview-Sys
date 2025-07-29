import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const EmailEditor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const campaignId = queryParams.get('id');
  const isViewMode = queryParams.get('view') === 'true';

  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (campaignId) {
      const savedCampaigns = JSON.parse(localStorage.getItem('campaigns')) || [];
      const found = savedCampaigns.find((c) => c.id === parseInt(campaignId));
      if (found) {
        setSubject(found.subject || '');
        setBody(found.body || '');
        setIsEditing(true);
      }
    }
  }, [campaignId]);

  const handleSave = () => {
    const trimmedSubject = subject.trim();
    const trimmedBody = body.trim();

    if (!trimmedSubject || !trimmedBody || trimmedSubject.toLowerCase() === 'untitled campaign') {
      alert('Please provide a valid subject and body for your campaign.');
      return;
    }

    const savedCampaigns = JSON.parse(localStorage.getItem('campaigns')) || [];

    const newCampaign = {
      id: isEditing ? parseInt(campaignId) : Date.now(),
      title: trimmedSubject,
      subject: trimmedSubject,
      body: trimmedBody,
      date: new Date().toISOString().split('T')[0],
      status: 'Draft',
    };

    const updatedCampaigns = isEditing
      ? savedCampaigns.map((c) => (c.id === newCampaign.id ? newCampaign : c))
      : [...savedCampaigns, newCampaign];

    localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));
    alert('✅ Campaign saved successfully!');
    navigate('/dashboard');
  };

  const styles = {
    container: {
      maxWidth: '600px',
      margin: 'auto',
      padding: '20px',
    },
    label: {
      display: 'block',
      marginBottom: '6px',
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '15px',
      borderRadius: '4px',
      border: '1px solid #ccc',
    },
    button: {
      padding: '10px 16px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    title: {
      textAlign: 'center',
      fontSize: '22px',
      marginBottom: '20px',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>
        {isViewMode ? '👁️ View Email Campaign' : isEditing ? '✏️ Edit Email Campaign' : '✍️ Create Email Campaign'}
      </h2>

      <label style={styles.label}>Subject:</label>
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        style={styles.input}
        placeholder="Enter subject..."
        readOnly={isViewMode}
      />

      <label style={styles.label}>Body:</label>
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        style={{ ...styles.input, height: '150px' }}
        placeholder="Write your email content here..."
        readOnly={isViewMode}
      />

      {!isViewMode && (
        <button style={styles.button} onClick={handleSave}>
          💾 Save Campaign
        </button>
      )}
    </div>
  );
};

export default EmailEditor;
