import React, { useState, useEffect } from "react";
import axios from "axios";

const VerifyOtp = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Get stored email from localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem("emailToVerify");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        { email, otp }
      );

      setMessage(res.data.message);

      // store OTP for set password page (optional)
      localStorage.setItem("otpToVerify", otp);

      // redirect to set password page
      setTimeout(() => {
        window.location.href = "/set-password";
      }, 1500);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Invalid OTP, try again!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Verify OTP</h2>
      <form onSubmit={handleVerifyOtp} style={styles.form}>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          required
          onChange={(e) => setOtp(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
      <p>
        Didn't receive OTP? <a href="/register">Resend</a>
      </p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "100px auto",
    padding: "20px",
    textAlign: "center",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
  },
  message: {
    marginTop: "15px",
    fontWeight: "bold",
    color: "green",
  },
};

export default VerifyOtp;
