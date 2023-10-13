import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import "./GenerateOfferLetterForm.css";
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
  const [branchName, setBranchName] = useState<string>("");
  const [positionType, setPositionType] = useState<string>("Full-Time");
  const [anticipatedStartDate, setAnticipatedStartDate] = useState<string>("");
  const [startingSalary, setStartingSalary] = useState<string>("");
  const [increaseMinSalary, setIncreaseMinSalary] = useState<string>("");
  const [increaseMaxSalary, setIncreaseMaxSalary] = useState<string>("");
  const [basicSalaryDetails, setBasicSalaryDetails] = useState<string>("");
  const [workAllowance, setWorkAllowance] = useState<string>("");
  const [livingAllowance, setLivingAllowance] = useState<string>("");
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
    const pageHeight = 297; // A4 height
    const margin = 10; // Bottom margin

    let yPosition = 40;
    const addContent = (content: string, increment = 10) => {
      const splitText = doc.splitTextToSize(content, maxWidth);
      if (yPosition + increment * splitText.length > pageHeight - margin) {
        doc.addPage();
        yPosition = 10; // Reset yPosition for new page
      }
      doc.text(splitText, 10, yPosition);
      yPosition += increment * splitText.length;
    };
    // Serial Number and Date
    addContent(`Serial Number: #${serialNumber}`);
    addContent(`Date: ${currentDate}`);
    doc.setFontSize(22);
    addContent("JOB OFFER", 12);
    doc.setFontSize(12);
    addContent(`Dear: ${candidateName}`);
    addContent(
      `${branchName} is delighted to offer you the ${positionType} position of Sales Person with an anticipated start date of ${anticipatedStartDate}.`
    );
    addContent(`As the Sales Person, you will be responsible for:`);

    const responsibilities = [
      "Greet customers.",
      "Help customers find products in the store.",
      "Provide customers with information about products.",
      " Elevate customers complaints to supervisor.",
      "Keep track of stock.",
      "Present, promote and sell products/services using solid arguments to existing and prospective customers.",
      "Establishing, developing, and maintaining relationships with customers to ensure continued sales in the future.",
      "Solve the problem of customers by consulting the Supervisor and understanding the customer and his complaints and solving them, if possible, without the need to escalate the problem to the branch manager.",
      "Achieve agreed upon sales targets and outcomes within schedule.",
      "Coordinate sales effort with team members.",
      "Continuously improve through feedback.",
      "Attempting to attract new customers and satisfy the customers who contact the branch and try to attract them to buy.",
      "Clean the workplace and keep it clean.",
      "Receiving the products, placing the price barcode on them, cleaning the product and checking its condition before display.",
      " Expanding horizons and trying to give the customer options to buy and not stick to just one product.",
      "Focus on selling without looking at the commission in the product and selling the product with high commission only.",
    ];

    responsibilities.forEach((responsibility) => {
      addContent(responsibility);
    });

    addContent(
      `You will report directly to Branch Manager/Supervisor at ${branchName}.`
    );
    addContent(
      `The starting salary for this position is ${startingSalary} after 1 month or 6 months and depending on your performance will be increased from ${increaseMinSalary} to ${increaseMaxSalary}. Payment is on a Monthly basis.`
    );
    addContent(
      `Rule in company, the contract will be 3 years, if you do not finish the 2 years you need to pay 5000aed.`,
      7
    );
    addContent(
      `${branchName} offers a comprehensive benefits program, which includes medical insurance, etc.`
    );
    addContent(`Home Leave & Allowance`, 7);
    addContent(
      `Employee shall be entitled to 30 days home leave. Employee will receive 1000aed for leave allowance.`
    );
    addContent(`Salary details are as follows:`, 7);
    addContent(`Basic Salary of ${basicSalaryDetails}`, 7);
    addContent(`Nature Of Work Allowance ${workAllowance}`, 7);
    addContent(`Cost Of Living Allowance ${livingAllowance}`, 7);
    addContent(
      `Note: This offer is for one week from the date of knowing that if you agree to work will go about work after approval 1 week.`
    );
    addContent(`Mr. Abdulmunim Swedan`, 7);
    addContent(`Chief Financial Officer    Signature / Date:`, 7);
    addContent(`Awad Jamal Al Awad`, 7);
    addContent(`Operation Manager    Signature / Date:`, 7);
    addContent(`Laraine Kris Alcantara`, 7);
    addContent(`Hr&Administrative    Signature / Date:`, 7);
    addContent(`Mahmoud Ali Abdelahd Ali  Employee    Signature / Date:`, 7);

    addContent(
      `You will report directly to Branch Manager/Supervisor at ${branchName}.`
    );
    addContent(
      `The starting salary for this position is ${startingSalary} after 1 month or 6 months and depending on your performance will be increased from ${increaseMinSalary} to ${increaseMaxSalary}. Payment is on a Monthly basis.`
    );
    addContent(
      `Rule in company, the contract will be 3 years, if you do not finish the 2 years you need to pay 5000aed.`,
      7
    );
    addContent(
      `${branchName} offers a comprehensive benefits program, which includes medical insurance, etc.`
    );
    addContent(`Home Leave & Allowance`, 7);
    addContent(
      `Employee shall be entitled to 30 days home leave. Employee will receive 1000aed for leave allowance.`
    );
    addContent(`Salary details are as follows:`, 7);
    addContent(`Basic Salary of ${basicSalaryDetails}`, 7);
    addContent(`Nature Of Work Allowance ${workAllowance}`, 7);
    addContent(`Cost Of Living Allowance ${livingAllowance}`, 7);
    addContent(
      `Note: This offer is for one week from the date of knowing that if you agree to work will go about work after approval 1 week.`
    );
  addContent(`Mr. Abdulmunim Swedan`, 7);
  addContent(`Chief Financial Officer    Signature / Date:`, 7);
  addContent(`Awad Jamal Al Awad`, 7);
  addContent(`Operation Manager    Signature / Date:`, 7);
  addContent(`Laraine Kris Alcantara`, 7);
  addContent(`Hr&Administrative    Signature / Date:`, 7);
  addContent(`Mahmoud Ali Abdelahd Ali  Employee    Signature / Date:`, 7);

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
          <label>Branch Name:</label>
          <input
            type="text"
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
          />
        </div>
        <div>
          <label>Position Type:</label>
          <select
            value={positionType}
            onChange={(e) => setPositionType(e.target.value)}
          >
            <option value="Full-Time">Full-Time</option>
            <option value="Part-Time">Part-Time</option>
          </select>
        </div>
        <div>
          <label>Anticipated Start Date:</label>
          <input
            type="date"
            value={anticipatedStartDate}
            onChange={(e) => setAnticipatedStartDate(e.target.value)}
          />
        </div>
        {/* ... Previous code ... */}
        <div>
          <label>Starting Salary:</label>
          <input
            type="text"
            value={startingSalary}
            onChange={(e) => setStartingSalary(e.target.value)}
          />
        </div>
        <div>
          <label>Salary after Increase (Min):</label>
          <input
            type="text"
            value={increaseMinSalary}
            onChange={(e) => setIncreaseMinSalary(e.target.value)}
          />
        </div>
        <div>
          <label>Salary after Increase (Max):</label>
          <input
            type="text"
            value={increaseMaxSalary}
            onChange={(e) => setIncreaseMaxSalary(e.target.value)}
          />
        </div>
        <div>
          <label>Basic Salary Details:</label>
          <input
            type="text"
            value={basicSalaryDetails}
            onChange={(e) => setBasicSalaryDetails(e.target.value)}
          />
        </div>
        <div>
          <label>Nature Of Work Allowance:</label>
          <input
            type="text"
            value={workAllowance}
            onChange={(e) => setWorkAllowance(e.target.value)}
          />
        </div>
        <div>
          <label>Cost Of Living Allowance:</label>
          <input
            type="text"
            value={livingAllowance}
            onChange={(e) => setLivingAllowance(e.target.value)}
          />
        </div>
        {/* ... Rest of the form code ... */}

        {/* ... Add other input fields similarly ... */}
        <div>
          <button className="form" type="submit">
            Generate Offer Letter
          </button>
        </div>
      </form>
    </div>
  );
};

export default GenerateOfferLetterForm;
