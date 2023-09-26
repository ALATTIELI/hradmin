import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import "./GenerateOfferLetterForm.css"
import { useSelector } from "react-redux";
import employeesData from "../EmployeeManagement/EmployeesData";
import { RootState } from "../Redux/store";
import Sidebar from "../SideBar/Sidebar";
import TopBar from "../TopBar/Topbar";


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

const GenerateOfferLetterForm: React.FC = () => {
  const [candidateName, setCandidateName] = useState<string>("");
  const [institutionName, setInstitutionName] = useState<string>("");
  const [totalSalary, setTotalSalary] = useState<string>("");
  const [basicSalary, setBasicSalary] = useState<string>("");
  const [transportAllowance, setTransportAllowance] = useState<string>("");
  const [otherAllowances, setOtherAllowances] = useState<string>("");
  const [serialNumber, setSerialNumber] = useState<number>(1);

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  useEffect(() => {
    const storedSerialNumber = localStorage.getItem("offerLetterSerialNumber");
    if (storedSerialNumber) {
      setSerialNumber(Number(storedSerialNumber));
    }
  }, []);

  const generatePDF = () => {
    const doc = new jsPDF();
    const maxWidth = 180;

    // Add "Offer Letter" heading to the PDF
    doc.setFontSize(22); // Increase font size for the heading
    doc.text("Offer Letter", 10, 20); // Adjust the y-coordinate to position the heading properly
    doc.setFontSize(12); // Reset font size for the rest of the content

    const splitName = doc.splitTextToSize(`Dear: ${candidateName}`, maxWidth);
    const splitInstitution = doc.splitTextToSize(
      `We institutions IN: ${institutionName} advance your career showing that you should do with Salary of: ${totalSalary} AED`,
      maxWidth
    );
    const splitNote = doc.splitTextToSize(
      `Note: This offer is for one week from the date of knowing that if you agree to work will go about work after approval 1 WEEK`,
      maxWidth
    );

    doc.text(splitName, 10, 40);
    doc.text(`Date: ${currentDate}`, 10, 50 + splitName.length * 7);
    doc.text(splitInstitution, 10, 60 + splitName.length * 7);
    // doc.text(`advance your career showing that you should do with Salary of: ${totalSalary} AED`, 10, 40 + (splitName.length + splitInstitution.length) * 7);
    doc.text(
      `Basic salary of: ${basicSalary} AED`,
      10,
      70 + (splitName.length + splitInstitution.length) * 7
    );
    doc.text(
      `Transportation allowance: ${transportAllowance} AED`,
      10,
      80 + (splitName.length + splitInstitution.length) * 7
    );
    doc.text(
      `Other allowances: ${otherAllowances} AED`,
      10,
      90 + (splitName.length + splitInstitution.length) * 7
    );
    doc.text(
      splitNote,
      10,
      100 + (splitName.length + splitInstitution.length) * 7
    );
    doc.text(`Serial Number: #${serialNumber}`, 10, 30);

    doc.save("OfferLetter.pdf");

    const newSerialNumber = serialNumber + 1;
    setSerialNumber(newSerialNumber);
    localStorage.setItem("offerLetterSerialNumber", String(newSerialNumber));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    generatePDF();
  };

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
    <div>
        <TopBar toggleSidebar={toggleSidebar} />
        <Sidebar
          currentUser={currentUser}
          toggleSidebar={toggleSidebar}
          className={isSidebarOpen ? "open" : ""}
        />
      <h1>Generate Offer Letter</h1>
      <form onSubmit={handleSubmit}>
      <div>
        <label>Dear:</label>
        <input
          type="text"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
        />
      </div>
      <div>
        <label>Date:</label>
        <span>{currentDate}</span>
      </div>
      <div>
        <label>We institutions IN:</label>
        <input
          type="text"
          value={institutionName}
          onChange={(e) => setInstitutionName(e.target.value)}
        />
        <label>
          advance your career showing that you should do with Salary of:
        </label>
        <input
          type="text"
          value={totalSalary}
          onChange={(e) => setTotalSalary(e.target.value)}
        />
      </div>
      <div>
        <label>Basic salary of:</label>
        <input
          type="text"
          value={basicSalary}
          onChange={(e) => setBasicSalary(e.target.value)}
        />
      </div>
      <div>
        <label>Transportation allowance:</label>
        <input
          type="text"
          value={transportAllowance}
          onChange={(e) => setTransportAllowance(e.target.value)}
        />
      </div>
      <div>
        <label>Other allowances:</label>
        <input
          type="text"
          value={otherAllowances}
          onChange={(e) => setOtherAllowances(e.target.value)}
        />
      </div>
      <div>
        <button className="form" type="submit">Generate Offer Letter</button>
      </div>
    </form>
    </div>
  );
};

export default GenerateOfferLetterForm;
