import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    // Save user info (temporary storage)
    const user = {
      email,
      role,
    };

    localStorage.setItem("user", JSON.stringify(user));

    // Redirect to dashboard
    window.location.href = "/dashboard";
  };

  return (
    <div className="login-container">
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="manager">Manager</option>
        <option value="employee">Employee</option>
      </select>

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
