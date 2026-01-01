import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import generateOtp from "../utils/generateOtp.js";
import sendEmail from "../utils/sendEmail.js";

/* =========================
   REGISTER → SEND OTP
========================= */
export const registerUser = async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user && user.isVerified) {
      return res.status(400).json({ message: "User already exists" });
    }

    const otp = generateOtp();
    const otpExpires = Date.now() + 10 * 60 * 1000; // 10 min

    if (!user) {
      user = await User.create({
        email,
        otp,
        otpExpires,
      });
    } else {
      user.otp = otp;
      user.otpExpires = otpExpires;
      await user.save();
    }

    await sendEmail(email, "Verify your account", `Your OTP is ${otp}`);

    res.status(200).json({
      message: "OTP sent to email",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



/* =========================
   VERIFY OTP
========================= */
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({ message: "User not found" });

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;

    await user.save();

    res.status(200).json({
      message: "OTP verified",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



/* =========================
   SET PASSWORD
========================= */
export const setPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !user.isVerified) {
      return res.status(400).json({ message: "User not verified" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      message: "Password set successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* =========================
   LOGIN
========================= */
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* =========================
   FORGOT PASSWORD → SEND OTP
========================= */
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !user.isVerified) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = generateOtp();
    user.otp = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 min

    await user.save();

    await sendEmail(
      email,
      "Reset Password OTP",
      `Your password reset OTP is ${otp}`
    );

    res.status(200).json({
      message: "OTP sent for password reset",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* =========================
   RESET PASSWORD
========================= */
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({ message: "User not found" });

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpires = undefined;

    await user.save();

    res.status(200).json({
      message: "Password reset successful",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
