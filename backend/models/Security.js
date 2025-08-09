import config from "@/config";
import { CLIENT_TYPE, OTP_TYPES, SECURITY_ACTIVITY } from "@/constants/enum";
import mongoose from "mongoose";
import ms from "ms";

const SecuritySchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    clientType: {
      type: String,
      required: true,
      enum: CLIENT_TYPE,
    },
    type: {
      type: String,
      required: true,
      enum: SECURITY_ACTIVITY,
    },
    mode: {
      type: String,
      required: true,
      enum: OTP_TYPES,
    },
    value: {
      type: String,
      required: true,
    },
    secret: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      expires: ms(config.OTP_EXPIRY),
    },
  },
  { timestamps: true }
);

const Security = mongoose.model("security", SecuritySchema, "security");
export default Security;
