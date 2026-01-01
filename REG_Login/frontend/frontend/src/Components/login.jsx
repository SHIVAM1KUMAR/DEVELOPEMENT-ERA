import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // use Link instead of <a> for React Router

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      setMessage("Login successful!");

      // store JWT token in localStorage for protected routes
      localStorage.setItem("token", res.data.token);

      // redirect to dashboard
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Invalid email or password!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {message && <p style={styles.message}>{message}</p>}

      {/* Links to Register and Forgot Password */}
      <div style={{ marginTop: "15px" }}>
        <Link to="/register" style={styles.link}>
          Register
        </Link>
        {" | "}
        <Link to="/forgot-password" style={styles.link}>
          Forgot Password?
        </Link>
      </div>
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
  link: {
    textDecoration: "none",
    color: "#007bff",
    fontWeight: "bold",
  },
};

export default Login;
