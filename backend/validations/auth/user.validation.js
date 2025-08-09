import { EMAIL, EMAIL_CHARS, PASSWORD } from "@/constants/regex";
import yupToFormError from "@/utils/yupToFormError";
import * as yup from "yup";

export const signup = async (req, res, next) => {
  try {
    const { body } = req;

    const schema = yup.object({
      email: yup
        .string()
        .email("Invalid email")
        .min(5, "Invalid email")
        .max(50, "Maximum character exeeded")
        .matches(EMAIL, "Invalid Email")
        .matches(EMAIL_CHARS, "Email has invalid characters")
        .trim()
        .required("Email is required"),
      name: yup.string().min(1).max(50, "Maximum character exeeded").required(" name is required"),
      password: yup.string().min(1).max(50, "Maximum character exeeded").required(" pasword is required"),

    });

    try {
      await schema.validate(body, { abortEarly: false });
      return next();
    } catch (validationError) {
      return res.status(400).json({ success: false, errors: yupToFormError(validationError) });
    }
  } catch (error) {
    console.error("Signup validation error:", error);
    return res.status(500).json({ success: false, message: "Something went wrong during signup validation." });
  }
};

export const passowrd = async (req, res, next) => {
  try {
    const { body } = req;
    const schema = yup.object({
      password: yup.string().matches(PASSWORD, "Invalid Password").trim().required("Password is required"),
    });
    try {
      await schema.validate(body, { abortEarly: false });
      return next();
    } catch (validationError) {
      return res.status(400).json({ success: false, errors: yupToFormError(validationError) });
    }
  } catch (error) {
    console.error("validation error:", error);
    return res.status(500).json({ success: false, message: "Something went wrong." });
  }
};

export const email = async (req, res, next) => {
  try {
    const { body } = req;

    const schema = yup.object({
      email: yup
        .string()
        .email("Invalid email")
        .min(5, "Invalid email")
        .max(50, "Maximum character exeeded")
        .matches(EMAIL, "Invalid Email")
        .matches(EMAIL_CHARS, "Email has invalid characters")
        .trim()
        .required("Email is required"),
    });

    try {
      await schema.validate(body, { abortEarly: false });
      return next();
    } catch (error) {
      return res.status(400).json({ success: false, errors: yupToFormError(error) });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
};
