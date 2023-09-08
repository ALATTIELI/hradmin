// routes.tsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './Login';
import Dashboard from './Dashboard';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import Settings from './Settings';
import Stockorder from './Stockorder';
import OrderDetails from './OrderDetails';
import WarrantyView from './WarrantyItems';
import BorrowRequest from './BorrowItems';
import DeviceMaintenance from './DeviceMaintenance';
import EmployeeManagement from './EmployeeManagement'; // <-- Import the new component


const ProtectedRoute: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  
  return isAuthenticated ? <Dashboard /> : <LoginPage />;
}

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/Stock-order" element={<Stockorder />} />
        <Route path="/stock-order/:orderId" element={<OrderDetails />} />
        <Route path="/Warranty-Items" element={<WarrantyView />} />
        <Route path="/Borrow-Items" element={<BorrowRequest />} />
        <Route path="/Device-Maintenance" element={<DeviceMaintenance />} />
        <Route path="/Employee-Management" element={<EmployeeManagement />} /> {/* <-- Add this line */}



      {/* ... other routes if needed ... */}
    </Routes>
  );
}

export default AppRoutes;
