import Campaign from '../models/Campaign.js';
import Contact from '../models/Contact.js';

export const getAnalytics = async (req, res) => {
  try {
    const userId = req.user._id;

    const totalCampaigns = await Campaign.countDocuments({ userId });
    const totalContacts = await Contact.countDocuments({ userId });
    const sentCampaigns = await Campaign.countDocuments({ userId, sent: true });
    const draftCampaigns = await Campaign.countDocuments({ userId, sent: false });

    res.json({
      totalCampaigns,
      totalContacts,
      sentCampaigns,
      draftCampaigns
    });
  } catch (error) {
    console.error('[Analytics Error]', error);
    res.status(500).json({ message: 'Failed to fetch analytics', error: error.message });
  }
};
