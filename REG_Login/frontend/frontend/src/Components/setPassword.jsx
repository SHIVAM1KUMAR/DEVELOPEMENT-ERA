import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // import useNavigate

const SetPassword = () => {
  const [email, setEmail] = useState(""); // email stored from registration
  const [otp, setOtp] = useState("");     // OTP from registration verification
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // initialize navigate

  // get email & OTP from localStorage
  useEffect(() => {
    const storedEmail = localStorage.getItem("emailToVerify");
    const storedOtp = localStorage.getItem("otpToVerify"); // optional, if you store it
    if (storedEmail) setEmail(storedEmail);
    if (storedOtp) setOtp(storedOtp);
  }, []);

  const handleSetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/set-password",
        { email, otp, password }
      );

      setMessage(res.data.message);

      // clear stored OTP/email
      localStorage.removeItem("emailToVerify");
      localStorage.removeItem("otpToVerify");

      // ✅ redirect using React Router
      setTimeout(() => {
        navigate("/"); // navigate to login page
      }, 1000);
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
      <h2>Set Password</h2>
      <form onSubmit={handleSetPassword} style={styles.form}>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Setting..." : "Set Password"}
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

export default SetPassword;
