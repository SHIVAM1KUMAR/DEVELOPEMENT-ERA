import React, { useState } from "react";
import axios from "axios";

const ResetPassword = () => {
  const [email, setEmail] = useState(""); // User email
  const [otp, setOtp] = useState("");     // OTP received via email
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        { email, otp, newPassword }
      );

      setMessage(res.data.message);

      // redirect to login page after success
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Something went wrong!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Reset Password</h2>
      <form onSubmit={handleReset} style={styles.form}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          required
          onChange={(e) => setOtp(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          required
          onChange={(e) => setNewPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
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
    color: "red",
  },
};

export default ResetPassword;
