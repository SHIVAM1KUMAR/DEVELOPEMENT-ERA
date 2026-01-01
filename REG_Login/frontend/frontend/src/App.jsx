import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationPage from "./Components/registrationPage";
import VerifyOtp from "./Components/verifyOtp";
import SetPassword from "./Components/setPassword";
import Login from "./Components/login";
import ForgetPage from "./Components/forgetPage";
import ResetPassword from "./Components/resetPassword";
import Dashboard from "./Components/Dashboard";

function App() {
  return (
    
      <Routes>
        <Route path="/register" element={<RegistrationPage/>} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/set-password" element={<SetPassword />} />
        <Route path="/" element={<Login />} />
        <Route path="/forgot-password" element={<ForgetPage />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
   
  );
}

export default App;
