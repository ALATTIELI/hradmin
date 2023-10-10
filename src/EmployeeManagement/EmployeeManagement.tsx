import React, { useState } from "react";
import { useSelector } from "react-redux";
import employeesData from "./EmployeesData";
import Sidebar from "../SideBar/Sidebar";
import TopBar from "../TopBar/Topbar";
import { RootState } from "../Redux/store";
import { getNames } from "country-list";
import "./EmployeeManagement.css";

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
  employeeNo: string;
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
  visaCompany: string;
  passportNo: string;
  startDateOfJoining: string;
  passportissue: string;
  passportExpiry: string;
  employmentContractFullWorkIssueDate: string;
  employmentContractFullWorkExpiryDate: string;
  visaIssueDate: string;
  visaExpiryDate: string;
  visaStatus: string;
  dateOfBirth: string;
  age: string;
  workPhoneNo: string;
  personalNo: string;
  labourCard: string;
  labourCardIssue: string;
  labourCardExpiry: string;
  eidNumber: string;
  eidDateIssue: string;
  eidDateExpiry: string;
  insuranceName: string;
  insuranceIssue: string;
  insuranceExpiry: string;
  iloeDubaiInsurance: string;
  workinsuranceIssue: string;
  workinsuranceExpiry: string;
  covidVaccination: string[]; // array to store multiple doses
};

const countries = getNames();

function EmployeeManagement() {
  const [showForm, setShowForm] = useState(false);
  const [employeeData, setEmployeeData] = useState<NewEmployeeForm>({
    employeeNo: "",
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
    visaCompany: "",
    passportNo: "",
    startDateOfJoining: "",
    passportissue: "",
    passportExpiry: "",
    employmentContractFullWorkIssueDate: "",
    employmentContractFullWorkExpiryDate: "",
    visaIssueDate: "",
    visaExpiryDate: "",
    visaStatus: "",
    dateOfBirth: "",
    age: "",
    workPhoneNo: "",
    personalNo: "",
    labourCard: "",
    labourCardIssue: "",
    labourCardExpiry: "",
    eidNumber: "",
    eidDateIssue: "",
    eidDateExpiry: "",
    insuranceName: "",
    insuranceIssue: "",
    insuranceExpiry: "",
    iloeDubaiInsurance: "",
    workinsuranceIssue: "",
    workinsuranceExpiry: "",
    covidVaccination: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let updatedData: Partial<NewEmployeeForm> = {
      [name]: value,
    };

    // If dateOfBirth is changed, compute the age
    if (name === "dateOfBirth") {
      const birthDate = new Date(value);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDifference = today.getMonth() - birthDate.getMonth();

      if (
        monthDifference < 0 ||
        (monthDifference === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      updatedData.age = age.toString();
    }

    setEmployeeData((prevData) => ({
      ...prevData,
      ...updatedData,
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

      <button onClick={() => setShowForm(true)}> Employment Information</button>

      {showForm && (
        <div className="new-employee-form">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Employee No"
              name="employeeNo"
              value={employeeData.employeeNo}
              onChange={handleChange}
            />
            <label htmlFor="uploadphoto">Profile Pic:</label>
            <input
              type="file"
              placeholder="Upload Photo"
              name="photo"
              onChange={handleFileChange}
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
              type="password"
              placeholder="Password"
              name="password"
              value={employeeData.password}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Visa Company"
              name="visaCompany"
              value={employeeData.visaCompany}
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
              placeholder="Passport No"
              name="passportNo"
              value={employeeData.passportNo}
              onChange={handleChange}
            />
            <label htmlFor="startDateOfJoining">Start Date of Joining:</label>
            <input
              type="date"
              id="startDateOfJoining"
              name="startDateOfJoining"
              value={employeeData.startDateOfJoining}
              onChange={handleChange}
              pattern="\d{2}/\d{2}/\d{4}"
              placeholder="DD/MM/YYYY"
            />
            <label htmlFor="passportIssue">Passport Issue:</label>
            <input
              type="date"
              id="passportIssue"
              name="passportIssue"
              value={employeeData.passportissue}
              onChange={handleChange}
              pattern="\d{2}/\d{2}/\d{4}"
              placeholder="DD/MM/YYYY"
            />
            <label htmlFor="passportExpiry">Passport Expiry:</label>
            <input
              type="date"
              id="passportExpiry"
              name="passportExpiry"
              value={employeeData.passportExpiry}
              onChange={handleChange}
              pattern="\d{2}/\d{2}/\d{4}"
              placeholder="DD/MM/YYYY"
            />
            <label htmlFor="employmentContractFullWorkIssueDate">
              Employment Contract Full Work Issue Date:
            </label>
            <input
              type="date"
              id="employmentContractFullWorkIssueDate"
              name="employmentContractFullWorkIssueDate"
              value={employeeData.employmentContractFullWorkIssueDate}
              onChange={handleChange}
              pattern="\d{2}/\d{2}/\d{4}"
              placeholder="DD/MM/YYYY"
            />
            <label htmlFor="employmentContractFullWorkExpiryDate">
              Employment Contract Full Work Expiry Date:
            </label>
            <input
              type="date"
              id="employmentContractFullWorkExpiryDate"
              name="employmentContractFullWorkExpiryDate"
              value={employeeData.employmentContractFullWorkExpiryDate}
              onChange={handleChange}
              pattern="\d{2}/\d{2}/\d{4}"
              placeholder="DD/MM/YYYY"
            />
            <label htmlFor="visaIssueDate">Visa Issue Date:</label>
            <input
              type="date"
              id="visaIssueDate"
              name="visaIssueDate"
              value={employeeData.visaIssueDate}
              onChange={handleChange}
              pattern="\d{2}/\d{2}/\d{4}"
              placeholder="DD/MM/YYYY"
            />
            <label htmlFor="visaExpiryDate">Visa Expiry Date:</label>
            <input
              type="date"
              id="visaExpiryDate"
              name="visaExpiryDate"
              value={employeeData.visaExpiryDate}
              onChange={handleChange}
              pattern="\d{2}/\d{2}/\d{4}"
              placeholder="DD/MM/YYYY"
            />
            <input
              type="text"
              placeholder="Visa Status"
              name="visaStatus"
              value={employeeData.visaStatus}
              onChange={handleChange}
            />
            <label htmlFor="dateOfBirth">Date of Birthday:</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={employeeData.dateOfBirth}
              onChange={handleChange}
              pattern="\d{2}/\d{2}/\d{4}"
              placeholder="DD/MM/YYYY"
            />
            <input
              type="number"
              placeholder="Age"
              name="age"
              value={employeeData.age}
              readOnly // Since age is automatically calculated, make it read-only
            />
            <label>Nationality:</label>
            <select
              name="nationality"
              value={employeeData.nationality}
              onChange={handleChange}
            >
              {Object.entries(countries).map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Work Phone No"
              name="workPhoneNo"
              value={employeeData.workPhoneNo}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Personal No"
              name="personalNo"
              value={employeeData.personalNo}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Labour Card"
              name="labourCard No"
              value={employeeData.labourCard}
              onChange={handleChange}
            />
            <label htmlFor="labourCardIssue">Labour Card Issue:</label>
            <input
              type="date"
              id="labourCardIssue"
              name="labourCardIssue"
              value={employeeData.labourCardIssue}
              onChange={handleChange}
              pattern="\d{2}/\d{2}/\d{4}"
              placeholder="DD/MM/YYYY"
            />
            <label htmlFor="labourCardExpiry">Labour Card Expiry:</label>
            <input
              type="date"
              id="labourCardExpiry"
              name="labourCardExpiry"
              value={employeeData.labourCardExpiry}
              onChange={handleChange}
              pattern="\d{2}/\d{2}/\d{4}"
              placeholder="DD/MM/YYYY"
            />
            <input
              type="text"
              placeholder="EID Number"
              name="eidNumber"
              value={employeeData.eidNumber}
              onChange={handleChange}
            />
            <label htmlFor="eidDateIssue">EID Date Issue:</label>
            <input
              type="date"
              id="eidDateIssue"
              name="eidDateIssue"
              value={employeeData.eidDateIssue}
              onChange={handleChange}
              pattern="\d{2}/\d{2}/\d{4}"
              placeholder="DD/MM/YYYY"
            />
            <label htmlFor="eidDateExpiry">EID Date Expiry:</label>
            <input
              type="date"
              id="eidDateExpiry"
              name="eidDateExpiry"
              value={employeeData.eidDateExpiry}
              onChange={handleChange}
              pattern="\d{2}/\d{2}/\d{4}"
              placeholder="DD/MM/YYYY"
            />
            <input
              type="text"
              placeholder="Insurance Name"
              name="insuranceName"
              value={employeeData.insuranceName}
              onChange={handleChange}
            />
            <label htmlFor="insuranceExpiry">Insurance Issue:</label>
            <input
              type="date"
              id="insuranceIssue"
              name="insuranceIssue"
              value={employeeData.insuranceIssue}
              onChange={handleChange}
              pattern="\d{2}/\d{2}/\d{4}"
              placeholder="DD/MM/YYYY"
            />
            <label htmlFor="insuranceExpiry">Insurance Expiry:</label>
            <input
              type="date"
              id="insuranceExpiry"
              name="insuranceExpiry"
              value={employeeData.insuranceExpiry}
              onChange={handleChange}
              pattern="\d{2}/\d{2}/\d{4}"
              placeholder="DD/MM/YYYY"
            />
            <input
              type="text"
              placeholder="ILOE - Dubai Insurance"
              name="iloeDubaiInsurance"
              value={employeeData.iloeDubaiInsurance}
              onChange={handleChange}
            />
            <label htmlFor="workinsuranceExpiry">Work Insurance Issue:</label>
            <input
              type="date"
              id="workinsuranceIssue"
              name="workinsuranceIssue"
              value={employeeData.workinsuranceIssue}
              onChange={handleChange}
              pattern="\d{2}/\d{2}/\d{4}"
              placeholder="DD/MM/YYYY"
            />
            <label htmlFor="workinsuranceExpiry">Work Insurance Expiry:</label>
            <input
              type="date"
              id="workinsuranceExpiry"
              name="workinsuranceExpiry"
              value={employeeData.workinsuranceExpiry}
              onChange={handleChange}
              pattern="\d{2}/\d{2}/\d{4}"
              placeholder="DD/MM/YYYY"
            />
            {/* For simplicity, I'm only adding 1st dose. You can replicate this for the 2nd, 3rd, and 4th doses. */}
            <label htmlFor="covidVaccination[0]">
              Covid Vaccination (1st dose):
            </label>
            <input
              type="date"
              id="covidVaccination[0]"
              name="covidVaccination[0]"
              value={employeeData.covidVaccination[0]}
              onChange={handleChange}
              pattern="\d{2}/\d{2}/\d{4}"
              placeholder="DD/MM/YYYY"
            />{" "}
            <label htmlFor="covidVaccination[0]">
              Covid Vaccination (2nd dose):
            </label>
            <input
              type="date"
              id="covidVaccination[0]"
              name="covidVaccination[0]"
              value={employeeData.covidVaccination[0]}
              onChange={handleChange}
              pattern="\d{2}/\d{2}/\d{4}"
              placeholder="DD/MM/YYYY"
            />{" "}
            <label htmlFor="covidVaccination[0]">
              Covid Vaccination (3rd dose):
            </label>
            <input
              type="date"
              id="covidVaccination[0]"
              name="covidVaccination[0]"
              value={employeeData.covidVaccination[0]}
              onChange={handleChange}
              pattern="\d{2}/\d{2}/\d{4}"
              placeholder="DD/MM/YYYY"
            />{" "}
            <label htmlFor="covidVaccination[0]">
              Covid Vaccination (4th dose):
            </label>
            <input
              type="date"
              id="covidVaccination[0]"
              name="covidVaccination[0]"
              value={employeeData.covidVaccination[0]}
              onChange={handleChange}
              pattern="\d{2}/\d{2}/\d{4}"
              placeholder="DD/MM/YYYY"
            />
            {/* ...repeat for 2nd, 3rd, and 4th doses... */}
            <button type="submit">Add Employee</button>
          </form>
        </div>
      )}

    </div>
  );
}

export default EmployeeManagement;
