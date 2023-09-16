import React, { useState } from "react";
import { useSelector } from "react-redux";
import employeesData from "./EmployeesData";
import Sidebar from "./Sidebar";
import TopBar from "./Topbar";
import { RootState } from "./store";

type EmployeeData = {
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

type NewEmployeeForm = {
  employeeId: string;
  name: string;
  position: string;
  photo: File | null;
  username: string;
  password: string;
  branch: string;
  nationality: string;
  idnumber: string;
  passportnumber: string;
  joiningdate: string;
  salary: string;
};

function EmployeeManagement() {
  const [showForm, setShowForm] = useState(false);
  const [employeeData, setEmployeeData] = useState<NewEmployeeForm>({
    employeeId: "",
    name: "",
    position: "",
    photo: null,
    username: "",
    password: "",
    branch: "",
    nationality: "",
    idnumber: "",
    passportnumber: "",
    joiningdate: "",
    salary: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setEmployeeData((prevData) => ({
      ...prevData,
      photo: file,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Employee Data:", employeeData);
    // Here, you can send the employeeData to a backend API or store it in any state management tool if needed
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Fetch the logged-in user's username from Redux store
  const loggedInUser = useSelector((state: RootState) => state.auth.user);
  const loggedInUsername = loggedInUser ? loggedInUser.username : null;

  // Find the user in employeesData using the fetched username
  const user: EmployeeData | undefined = loggedInUsername
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
    <div className="employee-management">
      <TopBar toggleSidebar={toggleSidebar} />
      <Sidebar
        currentUser={currentUser}
        toggleSidebar={toggleSidebar}
        className={isSidebarOpen ? "open" : ""}
      />
      <h2>Employee Management</h2>
      <button onClick={() => setShowForm(true)}>Add New Employee</button>

      {showForm && (
        <div className="new-employee-form">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Employee ID"
              name="employeeId"
              value={employeeData.employeeId}
              onChange={handleChange}
            />
            {/* ... other input fields ... */}
            <input
              type="file"
              placeholder="Upload Photo"
              name="photo"
              onChange={handleFileChange}
            />
            <input
              type="date"
              placeholder="Joining Date"
              name="joiningdate"
              value={employeeData.joiningdate}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={employeeData.name}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Position"
              name="position"
              value={employeeData.position}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="User Name"
              name="username"
              value={employeeData.username}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Password"
              name="password"
              value={employeeData.passportnumber}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Branch"
              name="branch"
              value={employeeData.branch}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Nationality"
              name="nationality"
              value={employeeData.nationality}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="ID Number"
              name="idnumber"
              value={employeeData.idnumber}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Passport Number"
              name="passportnumber"
              value={employeeData.passportnumber}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Salary"
              name="salary"
              value={employeeData.salary}
              onChange={handleChange}
            />
            <button type="submit">Add Employee</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default EmployeeManagement;
