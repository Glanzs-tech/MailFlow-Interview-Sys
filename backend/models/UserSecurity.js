import mongoose from "mongoose";

const UserSecuritySchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isPhoneVerified: {
      type: Boolean,
      default: false,
    },
    isMfaEnabled: {
      type: Boolean,
      default: false,
    },
    mfaSecret: {
      type: String,
      default: "",
    },
    mfaUri: {
      type: String,
      default: "",
    },
    isTwoStepEnabled: {
      type: Boolean,
      default: false,
    },
    isNotifyLogin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const UserSecurity = mongoose.model("userSecurity", UserSecuritySchema, "userSecurity");
export default UserSecurity;
