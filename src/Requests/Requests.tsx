import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store';
import mockRequests, { UserRequest } from './mockRequests';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import employeesData from '../EmployeeManagement/EmployeesData';
import Sidebar from '../SideBar/Sidebar';
import TopBar from '../TopBar/Topbar';
import './Requests.css';

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

function Requests() {
  const requestsFromRedux = useSelector((state: RootState) => state.Requests);
  const requests = requestsFromRedux.length ? requestsFromRedux : mockRequests;

  const [selectedBranch, setSelectedBranch] = useState('All');

  const branches = ['All', ...new Set(requests.map((request) => request.branch))];

  const filteredRequests = selectedBranch === 'All' ? requests : requests.filter(request => request.branch === selectedBranch);

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
    <div className="requests-container">
      <TopBar toggleSidebar={toggleSidebar} />
        <Sidebar
          currentUser={currentUser}
          toggleSidebar={toggleSidebar}
          className={isSidebarOpen ? "open" : ""}
        />
      <h1>Requests Overview</h1>

      {/* Dropdown filter */}
      <div className="filter-container">
        <label htmlFor="branchFilter">Filter by Branch: </label>
        <select 
          id="branchFilter" 
          value={selectedBranch} 
          onChange={(e) => setSelectedBranch(e.target.value)}>
          {branches.map((branch) => (
            <option key={branch} value={branch}>
              {branch}
            </option>
          ))}
        </select>
      </div>

      {filteredRequests.map((request: UserRequest) => (
        <Link to={`/request-details/${request.id}`} key={request.id} className="request-box">
          <div className="request-content">
            <p>Branch: {request.branch}</p>
            <p>Name: {request.name}</p>
            <p>Type: {request.type}</p>
          </div>
          <div className="request-arrow">→</div>
        </Link>
      ))}
    </div>
  );
}

export default Requests;
