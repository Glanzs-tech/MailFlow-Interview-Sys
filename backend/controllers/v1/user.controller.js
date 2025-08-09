import XLSX from "xlsx";
import config from "@/config";
import { Contact } from "@/models";
// import parseEmailsFromExcel from "../../utils/parseEmailsFromExcel";
import nodemailer from "nodemailer";
import isEmpty from "is-empty";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL,
    pass: process.env.PASSWORD,
  },
});

const parseEmailsFromExcel = (buffer) => {
  const workbook = XLSX.read(buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const jsonData = XLSX.utils.sheet_to_json(sheet);
  return jsonData.map((row) => row.email).filter(Boolean);
};

export const uploadContactsFromExcel = async (req, res) => {
  const { body, file, user } = req;
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Excel file is required" });
    }

    const emails = parseEmailsFromExcel(req.file.buffer);

    if (!emails.length) {
      return res.status(400).json({ error: "No emails found in Excel file" });
    }

    for (const email of emails) {
      console.log(email);
      await transporter.sendMail({
        from: body.sender,
        to: email,
        subject: body.subject,
        text: body.content,
      });
    }
    console.log(user);

    const campaign = await Contact.create({
      name: body.campaignName,
      email: body.sender,
      creatorId: user.id,
    });

    if (!campaign) {
      res.status(400).json({ success: false, message: "Unable to create campaign" });
    }

    res.status(200).json({
      message: `Emails sent successfully to ${emails.length} recipients`,
      recipients: emails,
    });
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const dashboard = async (req, res) => {
  try {
    const { user } = req;
    const userId = user.id;

    const totalSubscribers = await Contact.countDocuments({ creatorId: userId });

    const sentCampaigns = await Contact.find({ creatorId: userId }).sort({ createdAt: -1 }).lean();

    const totalSentCampaigns = sentCampaigns.length;

    const emailsPerMonthMap = {};

    sentCampaigns.forEach((campaign) => {
      const date = new Date(campaign.createdAt);
      const yearMonth = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;

      emailsPerMonthMap[yearMonth] = (emailsPerMonthMap[yearMonth] || 0) + (campaign.sent || 0);
    });

    const emailsPerMonth = Object.entries(emailsPerMonthMap)
      .map(([month, count]) => ({ month, count }))
      .sort((a, b) => a.month.localeCompare(b.month));

    res.json({
      totalSubscribers,
      totalSentCampaigns,
      sentCampaigns: sentCampaigns.map((c) => ({
        id: c._id,
        name: c.name,
        sent: c.sent,
        createdAt: c.createdAt,
      })),
      emailsPerMonth,
    });
  } catch (error) {
    console.error("Dashboard API error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
