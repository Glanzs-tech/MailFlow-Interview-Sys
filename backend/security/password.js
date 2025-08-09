import config from "@/config";
import bcrypt from "bcryptjs";

export const generatePassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(parseInt(config.SALT_ROUNDS));
    const hash = await bcrypt.hash(password, salt);

    return { status: true, hash, salt };
  } catch (error) {
    console.log(error);
    return { status: false };
  }
};
export const hashingOTP = async (otp) => {
  try {
    const salt = await bcrypt.genSalt(parseInt(config.SALT_ROUNDS));
    const hash = await bcrypt.hash(otp, salt);

    return { status: true, hash, salt };
  } catch (error) {
    console.log(error);
    return { status: false };
  }
};
export const compareOTP = async (otp, hash) => {
  try {
    const compareStatus = await bcrypt.compare(otp, hash);
    return { status: compareStatus };
  } catch (error) {
    console.log(error);
    return { status: false };
  }
};

export const comparePassword = async (password, hash) => {
  try {
    const compareStatus = await bcrypt.compare(password, hash);
    return { status: compareStatus };
  } catch (error) {
    console.log(error);
    return { status: false };
  }
};
