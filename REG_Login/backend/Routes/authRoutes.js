import express from "express";
import {
  registerUser,
  verifyOtp,
  setPassword,
  loginUser,
  forgotPassword,
  resetPassword,
} from "../controllers/authcontroller.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================
   AUTH ROUTES
========================= */

// Register → Send OTP
router.post("/register", registerUser);

// Verify OTP
router.post("/verify-otp", verifyOtp);

// Set Password after OTP
router.post("/set-password", setPassword);

// Login
router.post("/login", loginUser);

// Forgot Password → Send OTP
router.post("/forgot-password", forgotPassword);

// Reset Password
router.post("/reset-password", resetPassword);

/* =========================
   PROTECTED ROUTES (Example)
========================= */

router.get("/dashboard", protect, (req, res) => {
  res.json({
    message: "Welcome to dashboard",
    user: req.user,
  });
});

export default router;
