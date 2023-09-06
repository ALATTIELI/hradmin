import { useState } from 'react';
import { useSelector } from 'react-redux';  // <-- Import this
import { RootState } from './store';       // <-- Ensure this is the correct path to your store
import employeesData from './EmployeesData';
import Sidebar from './Sidebar';
import TopBar from './Topbar';

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Fetch the logged-in user's username from Redux store
  const loggedInUser = useSelector((state: RootState) => state.auth.user);
  const loggedInUsername = loggedInUser ? loggedInUser.username : null;
  
  // Find the user in employeesData using the fetched username
  const user: Employee | undefined = loggedInUsername ? employeesData.employees.find(emp => emp.username === loggedInUsername) : undefined;

  // Default values
  let currentUser = {
    name: 'Unknown',
    photo: '/path/to/default/photo.jpg'
  };

  // If user exists, override the default values
  if (user) {
    currentUser.name = `${user.firstName} ${user.lastName} ${user.position}`;
    if (user.photoUrl) {
      currentUser.photo = user.photoUrl;
    }
  }

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
          className={isSidebarOpen ? 'open' : ''} 
        />
        <div className="main-content">
          {/* Main content */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
