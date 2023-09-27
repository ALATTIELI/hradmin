// routes.tsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './Login/Login';
import Dashboard from './SideBar/Dashboard';
import { useSelector } from 'react-redux';
import { RootState } from './Redux/store';
import Settings from './SideBar/Settings';
import Stockorder from './StockOrder/Stockorder';
import OrderDetails from './StockOrder/OrderDetails';
import WarrantyView from './WarrantyItems/WarrantyItems';
import BorrowRequest from './BorrowItems/BorrowItems';
import DeviceMaintenance from './DeviceMaintenance/DeviceMaintenance';
import EmployeeManagement from './EmployeeManagement/EmployeeManagement'; // <-- Import the new component
import AddProduct from './StockOrder/AddProduct';
import OrderList from './StockOrder/OrderList';
import  Category from './StockOrder/Category';
import Brand from './StockOrder/Brand';
import GenerateOfferLetterForm from './OfferLetterGenerator/GenerateOfferLetterForm';
import Requests from './Requests/Requests';
import RequestDetails from './Requests/RequestDetails';



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
        <Route path="/Order-list/:orderId" element={<OrderDetails />} />
        <Route path="/Warranty-Items" element={<WarrantyView />} />
        <Route path="/Borrow-Items" element={<BorrowRequest />} />
        <Route path="/Device-Maintenance" element={<DeviceMaintenance />} />
        <Route path="/Employee-Management" element={<EmployeeManagement />} /> {/* <-- Add this line */}
        <Route path="/Add-Product" element={<AddProduct />} />
        <Route path="/Order-list" element={<OrderList />} />
        <Route path="/Category" element={<Category />} />
        <Route path="/Brand" element={<Brand />} />
        <Route path="/offer-letter" element={<GenerateOfferLetterForm />} />
        <Route path="/Requests" element={<Requests />} />
        <Route path="/request-details/:requestId" element={<RequestDetails />} />





      {/* ... other routes if needed ... */}
    </Routes>
  );
}

export default AppRoutes;
