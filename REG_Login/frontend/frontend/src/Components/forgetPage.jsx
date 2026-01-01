import React, { useState } from "react";
import axios from "axios";

const ForgetPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );

      setMessage(res.data.message);

      // store email in localStorage for reset password page
      localStorage.setItem("emailForReset", email);

      // redirect to reset password page after short delay
      setTimeout(() => {
        window.location.href = "/reset-password";
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
      <h2>Forgot Password</h2>
      <form onSubmit={handleForgotPassword} style={styles.form}>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Sending OTP..." : "Send OTP"}
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
    backgroundColor: "#f39c12",
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

export default ForgetPage;
