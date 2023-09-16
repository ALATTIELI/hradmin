import { useState } from "react";
import { useSelector } from "react-redux"; // <-- Import this
import { RootState } from "./store"; // <-- Ensure this is the correct path to your store
import employeesData from "./EmployeesData";
import Sidebar from "./Sidebar";
import TopBar from "./Topbar";
import "./Dashboard.css";
import { Link } from "react-router-dom";

// Define a type for the employee
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

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    <div className="dashboard">
      <TopBar toggleSidebar={toggleSidebar} />
      <div className="dashboard-content">
        <Sidebar
          currentUser={currentUser}
          toggleSidebar={toggleSidebar}
          className={isSidebarOpen ? "open" : ""}
        />
        <div className="main-content">
          {/* Main content */}
          <div className="box employees">
            <Link to="/employee-management">Manage Employees</Link>
          </div>
          <div className="box tasks">
            <h2>Tasks/Projects</h2>
            {/* Tasks or projects content here */}
          </div>
          <div className="box notifications">
            <h2>Notifications/Updates</h2>
            {/* Notifications content here */}
          </div>
          <div className="box performance">
            <h2>Performance Metrics</h2>
            {/* Performance metrics content here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
