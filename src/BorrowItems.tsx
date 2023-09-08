import React, { useState } from "react";
import "./BorrowItems.css";
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
// Rename the interface to avoid naming conflict with the component
interface IBorrowRequest {
  id: number;
  requestingBranch: string;
  supplyingBranch: string;
  itemName: string;
  quantity: number;
  status: "Pending" | "Approved" | "Rejected";
}

const BorrowRequest: React.FC = () => {
  // This is mock data for now. In a real-world scenario, it would come from a backend.
  const [borrowRequests, setBorrowRequests] = useState<IBorrowRequest[]>([
    {
      id: 1,
      requestingBranch: "Branch A",
      supplyingBranch: "Branch B",
      itemName: "10171009",
      quantity: 5,
      status: "Pending",
    },
    {
      id: 2,
      requestingBranch: "Branch C",
      supplyingBranch: "Branch A",
      itemName: "10141007",
      quantity: 3,
      status: "Pending",
    },
  ]);

  const handleStatusUpdate = (
    requestId: number,
    newStatus: "Approved" | "Rejected"
  ) => {
    const updatedRequests = borrowRequests.map((request) =>
      request.id === requestId ? { ...request, status: newStatus } : request
    );
    setBorrowRequests(updatedRequests);
  };

  const handleApprove = (requestId: number) => {
    handleStatusUpdate(requestId, "Approved");
  };

  const handleReject = (requestId: number) => {
    handleStatusUpdate(requestId, "Rejected");
  };
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Fetch the logged-in user's username from Redux store
  const loggedInUser = useSelector((state: RootState) => state.auth.user);
  const loggedInUsername = loggedInUser ? loggedInUser.username : null;

  // Find the user in employeesData using the fetched username
  const user: Employee | undefined = loggedInUsername
    ? employeesData.employees.find((emp) => emp.username === loggedInUsername)
    : undefined;

  // Default values
  let currentUser = {
    name: "Unknown",
    photo: "/path/to/default/photo.jpg",
    position: "Guest", // Default value for position
  };

  // If user exists, override the default values
  if (user) {
    currentUser.name = `${user.firstName} ${user.lastName}`;
    currentUser.position = user.position; // Include this line
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
    <div className="Borrow-request-container">
      <TopBar toggleSidebar={toggleSidebar} />
      <Sidebar
        currentUser={currentUser}
        toggleSidebar={toggleSidebar}
        className={isSidebarOpen ? "open" : ""}
      />
      <h2>Borrow Requests</h2>
      {borrowRequests.map((request) => (
        <div key={request.id} className="borrow-request">
          <p>Requesting Branch: {request.requestingBranch}</p>
          <p>Supplying Branch: {request.supplyingBranch}</p>
          <p>Item: {request.itemName}</p>
          <p>Quantity: {request.quantity}</p>
          {request.status === "Pending" && (
            <div className="borrow-request-buttons">
              <button onClick={() => handleApprove(request.id)}>Approve</button>
              <button onClick={() => handleReject(request.id)}>Reject</button>
            </div>
          )}
          {request.status !== "Pending" && <p>Status: {request.status}</p>}
        </div>
      ))}
    </div>
  );
};

export default BorrowRequest;
