import React, { useState } from "react";
import axios from "axios";

const RegistrationPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        { email }
      );

      setMessage(res.data.message);

      // store email in localStorage for OTP verification
      localStorage.setItem("emailToVerify", email);

      setTimeout(() => {
        window.location.href = "/verify-otp"; // navigate to OTP page
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
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Sending OTP..." : "Register"}
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
    color: "green",
  },
};

export default RegistrationPage;
