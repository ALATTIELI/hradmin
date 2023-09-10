// StockOrder.tsx
import "./Stockorder.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import employeesData from "./EmployeesData";
import Sidebar from "./Sidebar";
import TopBar from "./Topbar";
import { RootState } from "./store";
import { Link } from "react-router-dom";

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

type Stockorder = {
  id: number;
  branchName: string;
  date: string;
  items: { name: string; quantity: number }[];
  status: string;
};


function Stockorder() {
  const [] = useState<Stockorder | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [] = useState(false); // New state to track visibility of orders list

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <TopBar toggleSidebar={toggleSidebar} />
      <Sidebar
        currentUser={currentUser}
        toggleSidebar={toggleSidebar}
        className={isSidebarOpen ? "open" : ""}
      />

      {/* Buttons to navigate to different pages */}
      <div className="navigation-buttons">
        <Link to="/Order-List" className="nav-btn">View Orders List</Link>
        <Link to="/add-product" className="nav-btn">Add New Product</Link>
        {/* Add more buttons as needed */}
      </div>
    </div>
  );
}

export default Stockorder;
