// StockOrder.tsx
import './Stockorder.css'
import { useState } from 'react';
import { useSelector } from "react-redux";
import employeesData from "./EmployeesData";
import Sidebar from "./Sidebar";
import TopBar from "./Topbar";
import { RootState } from "./store";
import { Link } from 'react-router-dom';

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
    items: { name: string, quantity: number }[];
    status: string;
};

const sampleOrders: Stockorder[] = [
    {
        id: 1,
        branchName: "Branch A",
        date: "2023-09-01",
        items: [
            { name: "Item 1", quantity: 10 },
            { name: "Item 2", quantity: 5 },
        ],
        status: "Pending"
    },
    // ... other orders
];

function Stockorder() {
    const [selectedOrder, setSelectedOrder] = useState<Stockorder | null>(null);
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
        <div>
            <TopBar toggleSidebar={toggleSidebar} />
      <Sidebar
        currentUser={currentUser}
        toggleSidebar={toggleSidebar}
        className={isSidebarOpen ? "open" : ""}
      />
            {/* Notification badge */}
            <div>
                {sampleOrders.filter(order => order.status === "Pending").length} New Orders
            </div>
            
            {/* List of Orders */}
            <ul>
                {sampleOrders.map(order => (
                    <Link to={`/stock-order/${order.id}`} key={order.id}>
                    <li>
                        {order.branchName} - {order.date}
                    </li>
                </Link>
                ))}
            </ul>

            {/* Detailed View (can be a modal or expanded view) */}
            {selectedOrder && (
                <div>
                    <h2>Order Details</h2>
                    <p>Branch: {selectedOrder.branchName}</p>
                    <p>Date: {selectedOrder.date}</p>
                    <ul>
                        {selectedOrder.items.map(item => (
                            <li key={item.name}>
                                {item.name} - {item.quantity}
                            </li>
                        ))}
                    </ul>
                    <button onClick={() => setSelectedOrder(null)}>Close</button>
                </div>
            )}
        </div>
    );
}

export default Stockorder;
