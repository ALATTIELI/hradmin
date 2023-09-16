// AdminWarrantyView.tsx
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import "./WarrantyItems.css";
import { useState } from "react";
import employeesData from "./EmployeesData";
import Sidebar from "./Sidebar";
import TopBar from "./Topbar";
import {
  setStatusReceived,
  setStatusReplaced,
  setStatusRejected,
  setStatusSentBack,
} from "./warrantySlice";

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


const branches = ["Branch A", "Branch B", "Branch C"];

function WarrantyView() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null); // Define the missing state variables

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

  const warrantyItems = useSelector((state: RootState) => state.warranty);
  const dispatch = useDispatch();

  const handleReceived = (invoiceNumber: string) => {
    dispatch(setStatusReceived(invoiceNumber));
  };

  const handleReplaced = (invoiceNumber: string) => {
    dispatch(setStatusReplaced(invoiceNumber));
  };

  const handleRejected = (
    invoiceNumber: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const reasonInput = e.currentTarget
      .previousElementSibling as HTMLInputElement;
    if (reasonInput && reasonInput.value) {
      dispatch(setStatusRejected({ invoiceNumber, reason: reasonInput.value }));
    }
  };
  const handleSendBack = (invoiceNumber: string) => {
    dispatch(setStatusSentBack(invoiceNumber));
  };

  return (
    <div className="warranty-items-container">
      <TopBar toggleSidebar={toggleSidebar} />
      <Sidebar
        currentUser={currentUser}
        toggleSidebar={toggleSidebar}
        className={isSidebarOpen ? "open" : ""}
      />

      <select
        value={selectedBranch || ""}
        onChange={(e) => setSelectedBranch(e.target.value)}
      >
        <option value="">All Branches</option>
        {branches.map((branch) => (
          <option key={branch} value={branch}>
            {branch}
          </option>
        ))}
      </select>

      <h1>Submitted Warranty Items</h1>
      {warrantyItems
        .filter((item) => !selectedBranch || item.branch === selectedBranch)
        .map((item, index) => (
          <div key={index} className="warranty-item">
            <p>
              <strong>Employee Name:</strong> {item.employeeName}
            </p>
            <p>
              <strong>Invoice Number:</strong> {item.invoiceNumber}
            </p>
            <p>
              <strong>Customer Phone Number:</strong> {item.phoneNumber}
            </p>
            <p>
              <strong>Date Received:</strong> {item.dateReceived}
            </p>
            <p>
              <strong>Reason for Repair:</strong> {item.description}
            </p>
            {item.status === "Pending" && (
              <button
                onClick={() => handleReceived(item.invoiceNumber.toString())}
              >
                Received
              </button>
            )}
            {item.status === "Received" && (
              <>
                <button
                  onClick={() => handleReplaced(item.invoiceNumber.toString())}
                >
                  Replaced
                </button>
                <input type="text" placeholder="Rejection reason" />
                <button
                  onClick={(e) =>
                    handleRejected(item.invoiceNumber.toString(), e)
                  }
                >
                  Reject
                </button>
              </>
            )}
            {item.status === "Replaced" && (
              <button onClick={() => handleSendBack(item.invoiceNumber)}>
                Send Back
              </button>
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

export default WarrantyView;
