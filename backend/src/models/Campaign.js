import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: String,
  body: String,
  sent: { type: Boolean, default: false },
});

const Campaign = mongoose.model('Campaign', campaignSchema);
export default Campaign;
