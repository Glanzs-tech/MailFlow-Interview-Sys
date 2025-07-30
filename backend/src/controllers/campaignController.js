// export const deleteCampaign = async (req, res) => {
//   try {
//     const campaign = await Campaign.findById(req.params.id);

//     if (!campaign) {
//       return res.status(404).json({ message: 'Campaign not found' });
//     }


//     if (campaign.user.toString() !== req.user._id.toString()) {
//       return res.status(403).json({ message: 'Unauthorized' });
//     }

//     await campaign.deleteOne();
//     res.json({ message: 'Campaign deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to delete campaign' });
//   }
// };

// createCampaign.js
export const createCampaign = async (req, res) => {
  try {
    const { title, subject, body } = req.body;

    const campaign = new Campaign({
      title,
      subject,
      body,
      user: req.user._id,
    });

    await campaign.save();
    res.status(201).json(campaign);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create campaign' });
  }
};

// getUserCampaigns.js
export const getUserCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find({ user: req.user._id });
    res.status(200).json(campaigns);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get campaigns' });
  }
};

// deleteCampaign.js
export const deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findById(req.params.id);

    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }

    if (campaign.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await campaign.deleteOne();
    res.json({ message: 'Campaign deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete campaign' });
  }
};

