import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [userEmail, setUserEmail] = useState("");
  const [message, setMessage] = useState("");

  // Fetch user info or verify token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Not logged in, redirect to login
      window.location.href = "/login";
      return;
    }

    // Optionally, fetch user data from backend
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserEmail(res.data.email);
      } catch (error) {
        setMessage("Session expired. Please login again.");
        localStorage.removeItem("token");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div style={styles.container}>
      <h2>Dashboard</h2>
      {userEmail ? (
        <p>Welcome, <b>{userEmail}</b>!</p>
      ) : (
        <p>{message || "Loading..."}</p>
      )}
      <button onClick={handleLogout} style={styles.button}>
        Logout
      </button>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "100px auto",
    padding: "20px",
    textAlign: "center",
    border: "1px solid #ddd",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  button: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
  },
};

export default Dashboard;
