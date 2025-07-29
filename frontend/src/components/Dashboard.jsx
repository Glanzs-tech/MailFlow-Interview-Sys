import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
// import bgImage from '../assets/card.jpg';

const Dashboard = () => {
  const navigate = useNavigate();

  const defaultCampaigns = [
    { id: 1, title: 'Welcome Series', date: '2025-07-27', status: 'Draft' },
    { id: 2, title: 'Product Launch', date: '2025-07-25', status: 'Sent' },
  ];

  const [campaigns, setCampaigns] = useState(() => {
    const saved = JSON.parse(localStorage.getItem('campaigns')) || [];
    return [...defaultCampaigns, ...saved];
  });

  const [totalContacts, setTotalContacts] = useState(0);
  const [totalCampaigns, setTotalCampaigns] = useState(0);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get('/analytics');
        const backendCampaigns = res.data.totalCampaigns;
        const defaultCampaignsCount = defaultCampaigns.length;

        setTotalCampaigns(backendCampaigns + defaultCampaignsCount);
        setTotalContacts(res.data.totalContacts);
      } catch (err) {
        console.error('Failed to fetch analytics', err);
      }
    };

    fetchAnalytics();

    const userCampaigns = campaigns.filter((c) => c.id > 2);
    localStorage.setItem('campaigns', JSON.stringify(userCampaigns));
  }, [campaigns]);

  const totalSent = campaigns.filter((c) => c.status === 'Sent').length;
  const totalDraft = campaigns.filter((c) => c.status === 'Draft').length;

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this campaign?');
    if (!confirmDelete) return;

    try {
      
      if (typeof id === 'string' && id.length === 24) {
        await api.delete(`/campaigns/${id}`);
      }

      
      const updated = campaigns.filter((c) => c.id !== id && c._id !== id);
      setCampaigns(updated);

     
      const remainingUserCampaigns = updated.filter((c) => c.id > 2);
      localStorage.setItem('campaigns', JSON.stringify(remainingUserCampaigns));

      alert('🗑️ Campaign deleted successfully!');
    } catch (err) {
      console.error('Delete Error:', err.response?.data || err.message);
      alert('❌ Failed to delete campaign.');
    }
  };

  const styles = {
    title: {
      fontSize: '24px',
      marginBottom: '20px',
    },
    buttons: {
      marginBottom: '20px',
    },
    button: {
      padding: '10px 15px',
      marginRight: '10px',
      border: 'none',
      borderRadius: '4px',
      color: 'white',
      cursor: 'pointer',
    },
    createBtn: { backgroundColor: '#4CAF50' },
    contactBtn: { backgroundColor: '#673ab7' },
    sendEmailBtn: { backgroundColor: '#ff4081' },
    analyticsCard: {
      display: 'flex',
      gap: '20px',
      marginBottom: '20px',
      flexWrap: 'wrap',
    },
    statCard: {
      flex: '1',
      backgroundColor: '#000000ff',
      padding: '15px',
      borderRadius: '8px',
      textAlign: 'center',
      minWidth: '140px',
    },
    campaignList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    campaignCard: {
      padding: '15px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      backgroundColor: '#000000ff',
    },
    actions: {
      display: 'flex',
      justifyContent: 'center',
      gap: '10px',
      marginTop: '10px',
    },
    viewBtn: { backgroundColor: '#2196F3' },
    editBtn: { backgroundColor: '#FF9800' },
    deleteBtn: { backgroundColor: '#f44336' },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Campaign Dashboard</h2>

      {/* 📈 Analytics Summary */}
      <div style={styles.analyticsCard}>
        <div style={styles.statCard}>
          <h3>{totalCampaigns}</h3>
          <p>Total Campaigns</p>
        </div>
        <div style={styles.statCard}>
          <h3>{totalSent}</h3>
          <p>Sent Campaigns</p>
        </div>
        <div style={styles.statCard}>
          <h3>{totalDraft}</h3>
          <p>Draft Campaigns</p>
        </div>
        <div style={styles.statCard}>
          <h3>{totalContacts}</h3>
          <p>Total Contacts</p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div style={styles.buttons}>
        <button
          style={{ ...styles.button, ...styles.createBtn }}
          onClick={() => navigate('/editor')}
        >
          + Create New Campaign
        </button>

        <button
          style={{ ...styles.button, ...styles.contactBtn }}
          onClick={() => navigate('/contacts')}
        >
          👥 Manage Contacts
        </button>

        <button
          style={{ ...styles.button, ...styles.sendEmailBtn }}
          onClick={() => navigate('/send')}
        >
          ✉️ Send Email
        </button>
      </div>

      {/* Campaigns List */}
      {campaigns.length === 0 ? (
        <p>No campaigns created yet. Start your first one!</p>
      ) : (
        <div style={styles.campaignList}>
          {campaigns.map((campaign) => (
            <div key={campaign.id || campaign._id} style={styles.campaignCard}>
              <h3>{campaign.title}</h3>
              <p>📅 {campaign.date}</p>
              <p>Status: {campaign.status}</p>
              <div style={styles.actions}>
                <button
                  style={{ ...styles.button, ...styles.viewBtn }}
                  onClick={() =>
                    navigate(`/editor?id=${campaign.id || campaign._id}&view=true`)
                  }
                >
                  View
                </button>
                <button
                  style={{ ...styles.button, ...styles.editBtn }}
                  onClick={() => navigate(`/editor?id=${campaign.id || campaign._id}`)}
                >
                  Edit
                </button>
                <button
                  style={{ ...styles.button, ...styles.deleteBtn }}
                  onClick={() => handleDelete(campaign.id || campaign._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
