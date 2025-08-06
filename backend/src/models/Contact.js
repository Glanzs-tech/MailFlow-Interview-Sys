import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

contactSchema.index({ owner: 1, email: 1 }, { unique: true });
// to avOid duplicate contacts for the same user unique

export const Contact = mongoose.model("Contact", contactSchema);
