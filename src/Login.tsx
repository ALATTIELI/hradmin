import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './authSlice';
import employeesData from './EmployeesData'; // Assuming your employeesData is in employeesData.ts
import './Login.css';


const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Basic authentication using the employeesData for this example
    const user = employeesData.employees.find(emp => emp.username === username && emp.password === password);
    if (user) {
      dispatch(login(user));
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div>
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
