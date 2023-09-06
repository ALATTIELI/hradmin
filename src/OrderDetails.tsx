import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./store"; // Ensure path is correct
import { useState } from "react";
import employeesData from "./EmployeesData";
import Sidebar from "./Sidebar";
import TopBar from "./Topbar";
import'./OrderDetails.css';

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

function OrderDetails() {
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
  const { orderId } = useParams<{ orderId?: string }>();

  if (!orderId) {
    return <div>Invalid Order ID</div>;
  }

  // Fetch orders from Redux state
  const orders = useSelector((state: RootState) => state.orders);

  // Find the order using the orderId
  const order = orders.find((order) => order.id === parseInt(orderId));

  if (!order) {
    return <div>Order not found!</div>;
  }

  return (
    <div className="order-details">
      <TopBar toggleSidebar={toggleSidebar} />
      <Sidebar
        currentUser={currentUser}
        toggleSidebar={toggleSidebar}
        className={isSidebarOpen ? "open" : ""}
      />
      <h2>Order Details</h2>
      <p>
        <strong>Branch:</strong> {order.branchName}
      </p>
      <p>
        <strong>Date:</strong> {order.date}
      </p>
      <p>
        <strong>Status:</strong> {order.status}
      </p>
      <ul>
        {order.items.map((item) => (
          <li key={item.name}>
            {item.name} - {item.quantity}
          </li>
        ))}
      </ul>
      <Link to="/stock-order">Back to Orders</Link>
    </div>
  );
}

export default OrderDetails;
