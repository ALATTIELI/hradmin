import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Redux/store";
import { approveRequest, rejectRequest } from "../Redux/requestsSlice";
import mockRequests from "./mockRequests";
import "./RequestDetails.css";
import { useState } from "react";
import employeesData from "../EmployeeManagement/EmployeesData";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


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

function RequestDetails() {
  const { requestId } = useParams<{ requestId?: string }>();
  const dispatch = useDispatch();

  // Using Redux data primarily, and mockRequests as a fallback
  const requestsFromRedux = useSelector((state: RootState) => state.Requests);
  const requests = requestsFromRedux.length ? requestsFromRedux : mockRequests;

  const request = requests.find((r) => r.id === parseInt(requestId || "0"));

  if (!request) {
    return <div>Request not found!</div>;
  }

  const handleApprove = () => {
    dispatch(approveRequest(request.id));
  };

  const handleReject = () => {
    dispatch(rejectRequest(request.id));
  };

  const [] = useState(false);

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


  return (
    <div className="request-details-container">
      {/* Add this class */}
      <Link to="/requests" className="back-icon">
      <ArrowBackIcon />
    </Link>
      <h1>Request Details</h1>
      <p>Branch: {request.branch}</p>
      <p>Name: {request.name}</p>
      <p>Type: {request.type}</p>
      <p>Details: {request.details}</p>
      <div className="button-container">
        <button onClick={handleApprove}>Approve</button>
        <button onClick={handleReject}>Reject</button>
      </div>
    </div>
  );
}

export default RequestDetails;
