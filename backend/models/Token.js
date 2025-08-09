import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    sessionId: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    expiration: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Token = mongoose.model("token", TokenSchema, "token");
export default Token;
