import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // <-- Added this import
import { login } from "../Redux/authSlice";
import employeesData from "../EmployeeManagement/EmployeesData";
import "./Login.css";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // <-- Added this line
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const user = employeesData.employees.find(
      (emp) => emp.username === username && emp.password === password
    );
    if (user) {
      dispatch(login(user));
      navigate("/dashboard"); // <-- Added this line to redirect to dashboard
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div>
      <div>
        <img
          src="./src/assets/logo1.png"
          alt="Company Logo"
          className="company-logo"
        />
      </div>
      <h2>Login Page</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
