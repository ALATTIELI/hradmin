import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Redux/store";
import "./DeviceMaintenance.css";
import employeesData from "../EmployeeManagement/EmployeesData";
import Sidebar from "../SideBar/Sidebar";
import TopBar from "../TopBar/Topbar";
import {
  setStatusReceived,
  setStatusReplaced,
  setStatusRejected,
  setStatusSentBack,
} from "../Redux/DeviceMaintenanceSlice";

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

function DeviceMaintenance() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const loggedInUser = useSelector((state: RootState) => state.auth.user);
  const loggedInUsername = loggedInUser ? loggedInUser.username : null;

  const user: Employee | undefined = loggedInUsername
    ? employeesData.employees.find((emp) => emp.username === loggedInUsername)
    : undefined;

  let currentUser = {
    name: "Unknown",
    photo: "/path/to/default/photo.jpg",
    position: "Guest",
  };

  if (user) {
    currentUser.name = `${user.firstName} ${user.lastName}`;
    currentUser.position = user.position;
    if (user.photoUrl) {
      currentUser.photo = user.photoUrl;
    }
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const maintenanceItems = useSelector((state: RootState) => state.DeviceMaintenance);
  const dispatch = useDispatch();

  const handleReceived = (serialNumber: string) => {
    dispatch(setStatusReceived(serialNumber));
  };

  const handleReplaced = (serialNumber: string) => {
    dispatch(setStatusReplaced(serialNumber));
  };

  const handleRejected = (serialNumber: string, e: React.MouseEvent<HTMLButtonElement>) => {
    const reasonInput = e.currentTarget.previousElementSibling as HTMLInputElement;
    if (reasonInput && reasonInput.value) {
      dispatch(setStatusRejected({ serialNumber, reason: reasonInput.value }));
    }
  };

  const handleSendBack = (serialNumber: string) => {
    dispatch(setStatusSentBack(serialNumber));
  };

  return (
    <div className="device-maintenance-container">
      <TopBar toggleSidebar={toggleSidebar} />
      <Sidebar
        currentUser={currentUser}
        toggleSidebar={toggleSidebar}
        className={isSidebarOpen ? "open" : ""}
      />

      <h1>Device Maintenance</h1>
      {maintenanceItems.map((item: any, index: number) => ( // Add explicit types
        <div key={index} className="maintenance-item">
 <p>
          <strong>Branch Name:</strong> {item.branchName}
        </p>
        <p>
          <strong>Customer Name:</strong> {item.customerName}
        </p>
        <p>
          <strong>Phone Number:</strong> {item.phoneNumber}
        </p>
        <p>
          <strong>Device:</strong> {item.device}
        </p>
        <p>
          <strong>Price:</strong> {item.price}
        </p>
        <p>
          <strong>Serial Number:</strong> {item.serialNumber}
        </p>
        <p>
          <strong>Repair Type:</strong> {item.repairType}
        </p>
        <p>
          <strong>Date Received:</strong> {item.dateReceived}
        </p>
        <p>
          <strong>Description:</strong> {item.description}
        </p>          
          {item.status === "Pending" && (
            <button onClick={() => handleReceived(item.serialNumber)}>Received</button>
          )}
          {item.status === "Received" && (
            <>
              <button onClick={() => handleReplaced(item.serialNumber)}>Replaced</button>
              <input type="text" placeholder="Rejection reason" />
              <button onClick={(e) => handleRejected(item.serialNumber, e)}>Reject</button>
            </>
          )}
          {item.status === "Replaced" && (
            <button onClick={() => handleSendBack(item.serialNumber)}>Send Back</button>
          )}
          {item.status === "Sent Back" && (
            <span style={{ color: "green", fontSize: "24px" }}>✔️</span>
          )}
          
          <hr />
        </div>
      ))}
    </div>
  );
}

export default DeviceMaintenance;
