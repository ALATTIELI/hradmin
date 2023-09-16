import React from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../Redux/store";
import { Link } from "react-router-dom";
import Sidebar from "../SideBar/Sidebar";
import TopBar from "../TopBar/Topbar";
import employeesData from "../EmployeeManagement/EmployeesData";
import './OrderList.css';

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


function OrderList() {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

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
      currentUser.position = user.position;
      if (user.photoUrl) {
        currentUser.photo = user.photoUrl;
      }
    }

    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };

    const orders = useSelector((state: RootState) => state.orders); // Assuming orders are stored in Redux

    return (
        <div className="order-list">
            <TopBar toggleSidebar={toggleSidebar} />
            <Sidebar
                currentUser={currentUser}
                toggleSidebar={toggleSidebar}
                className={isSidebarOpen ? "open" : ""}
            />
            <h2>List of Orders</h2>
            <ul>
                {orders.map(order => (
                    <Link to={`/order-details/${order.id}`} key={order.id}>
                        <li>
                            {order.branchName} - {order.date}
                        </li>
                    </Link>
                ))}
            </ul>
            <Link to="/">Back to Dashboard</Link>
        </div>
    );
}

export default OrderList;
