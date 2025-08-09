import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name:{
        type:String,
        required:true
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", UserSchema, "user");
export default User;
