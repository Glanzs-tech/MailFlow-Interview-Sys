import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    creatorId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("contact", ContactSchema, "contact");
export default Contact;
