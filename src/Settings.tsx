import { useState } from "react";
import { useSelector } from "react-redux";
import employeesData from "./EmployeesData";
import "./Setting.css";
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

function Settings() {
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="settings-page">
      <TopBar toggleSidebar={toggleSidebar} />
      <Sidebar
        currentUser={currentUser}
        toggleSidebar={toggleSidebar}
        className={isSidebarOpen ? "open" : ""}
      />
      {/* Profile Settings */}
      <section className="profile-settings">
        <h2>Profile Settings</h2>

        {/* Update Profile Information */}
        <div className="update-profile">
          <h3>Update Profile Information</h3>
          <form>
            <label>
              Name:
              <input type="text" placeholder="Enter name" />
            </label>
            <label>
              Email:
              <input type="email" placeholder="Enter email" />
            </label>
            <label>
              Phone Number:
              <input type="tel" placeholder="Enter phone number" />
            </label>
            <button type="submit">Update</button>
          </form>
        </div>

        {/* Change Profile Picture */}
        <div className="change-picture">
          <h3>Change Profile Picture</h3>
          <input type="file" />
          <button>Upload New Picture</button>
        </div>

        {/* Reset Password */}
        <div className="reset-password">
          <h3>Reset Password</h3>
          <form>
            <label>
              Current Password:
              <input type="password" placeholder="Enter current password" />
            </label>
            <label>
              New Password:
              <input type="password" placeholder="Enter new password" />
            </label>
            <label>
              Confirm New Password:
              <input type="password" placeholder="Confirm new password" />
            </label>
            <button type="submit">Reset Password</button>
          </form>
        </div>
      </section>

      {/* User & Role Management */}
      <section className="user-role-management">
        <h2>User & Role Management</h2>

        {/* Add, remove or modify roles */}
        <div className="manage-roles">
          <h3>Manage Roles</h3>
          {/* Here, you can add a table/list of roles with options to add, remove, or modify them */}
        </div>

        {/* Manage User Invitations and Access */}
        <div className="manage-users">
          <h3>Manage Users</h3>
          {/* Here, you can add a table/list of users with options to add, remove, or modify their access */}
        </div>
      </section>
    </div>
  );
}

export default Settings;
