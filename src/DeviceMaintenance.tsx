import React, { useState } from "react";
import './DeviceMaintenance.css'
import { useSelector } from "react-redux";
import employeesData from "./EmployeesData";
import Sidebar from "./Sidebar";
import TopBar from "./Topbar";
import { RootState } from "./store";


type Employee = {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    position: string;
    department: string;
    dateJoined: string;
    photoUrl?: string;
  };

type DeviceMaintenanceData = {
  customerName: string;
  phoneNumber: string;
  device: string;
  price: string;
  serialNumber: string;
  repairType: string;
  dateReceived: string;
  description: string;
};

const DeviceMaintenance: React.FC = () => {
  // Mock data
  const mockRequests: DeviceMaintenanceData[] = [
    {
      customerName: "John Doe",
      phoneNumber: "1234567890",
      device: "iPhone 12",
      price: "700",
      serialNumber: "XYZ1234567",
      repairType: "Software Update",
      dateReceived: "2023-09-01",
      description: "Software malfunctioning after the last update.",
    },
    {
      customerName: "Jane Smith",
      phoneNumber: "9876543210",
      device: "Samsung S21",
      price: "800",
      serialNumber: "ABC9876543",
      repairType: "Screen Replacement",
      dateReceived: "2023-09-05",
      description: "Screen cracked after dropping.",
    },
  ];

  const [requests] = useState<DeviceMaintenanceData[]>(mockRequests);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Fetch the logged-in user's username from Redux store
  const loggedInUser = useSelector((state: RootState) => state.auth.user);
  const loggedInUsername = loggedInUser ? loggedInUser.username : null;
  
  // Find the user in employeesData using the fetched username
  const user: Employee | undefined = loggedInUsername ? employeesData.employees.find(emp => emp.username === loggedInUsername) : undefined;

  // Default values
  let currentUser = {
    name: 'Unknown',
    photo: '/path/to/default/photo.jpg',
    position: 'Guest'  // Default value for position
  };

  // If user exists, override the default values
  if (user) {
    currentUser.name = `${user.firstName} ${user.lastName}`;
    currentUser.position = user.position;  // Include this line
    if (user.photoUrl) {
      currentUser.photo = user.photoUrl;
    }
  }
//   else {
//     //change url to /       
//     window.location.href='/login';
//   }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="Device-Maintenance-container">
        <TopBar toggleSidebar={toggleSidebar} />
        <Sidebar 
          currentUser={currentUser} 
          toggleSidebar={toggleSidebar} 
          className={isSidebarOpen ? 'open' : ''} 
        />
      <h2>Device Maintenance</h2>
      <table>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Phone Number</th>
            <th>Device</th>
            <th>Price</th>
            <th>Serial Number</th>
            <th>Repair Type</th>
            <th>Date Received</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request, index) => (
            <tr key={index}>
              <td>{request.customerName}</td>
              <td>{request.phoneNumber}</td>
              <td>{request.device}</td>
              <td>{request.price}</td>
              <td>{request.serialNumber}</td>
              <td>{request.repairType}</td>
              <td>{request.dateReceived}</td>
              <td>{request.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeviceMaintenance;
