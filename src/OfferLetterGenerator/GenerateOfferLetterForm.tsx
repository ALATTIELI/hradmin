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
    const headerHeight = 30; // Adjust as necessary
    const footerHeight = 30; // Adjust as necessary
    const contentTopMargin = 50; // space between header and content start
    const contentBottomMargin = 35; // space between content end and footer

    let yPosition = contentTopMargin;

    const addHeaderFooter = () => {
      // Add header
      doc.addImage("/header.png", "PNG", 10, 10, 190, headerHeight);

      // Add footer
      doc.addImage(
        "/footer.png",
        "PNG",
        10,
        pageHeight - footerHeight - 10,
        190,
        footerHeight
      );
    };
    const addContent = (
      content: string,
      increment = 10,
      fontSize = 12,
      fontStyle: "normal" | "bold" = "normal",
      xPosition = 10,
      color = [0, 0, 0], // Default to black. This is RGB.
      alignment: "left" | "center" | "right" = "left"

    ) => {
      doc.setFontSize(fontSize);
      doc.setFont("helvetica", fontStyle);
      doc.setTextColor(color[0], color[1], color[2]);

      if (alignment === "center") {
        const textWidth = doc.getStringUnitWidth(content) * fontSize / doc.internal.scaleFactor;
        const pageWidth = doc.internal.pageSize.width;
        xPosition = (pageWidth - textWidth) / 2;
    }

      if (content === "JOB OFFER") {
        const textWidth = doc.getStringUnitWidth(content) * fontSize;
        xPosition = (280 - textWidth) / 2; // 210 is the width of an A4 paper in mm
      }

      const splitText = doc.splitTextToSize(content, maxWidth);
      if (
          yPosition + increment * splitText.length >
          pageHeight - contentBottomMargin
      ) {
          doc.addPage();
          yPosition = contentTopMargin;
          addHeaderFooter();
      }
      doc.text(splitText, xPosition, yPosition);
      yPosition += increment * splitText.length;
      doc.setTextColor(0, 0, 0); // Reset text color to black after setting it
  };

    addHeaderFooter();

    // Serial Number and Date
    doc.setFontSize(12);
    doc.text(`Serial Number: #${serialNumber}`, 10, yPosition); // This will print the Serial Number on the left
    doc.text(`Date: ${currentDate}`, 140, yPosition); // This will print the Date towards the right
    yPosition += 10; // Increment yPosition for the next line of content
    doc.setFontSize(22);
    addContent("JOB OFFER", 12, 22, "bold"); // This will center the text because of the condition inside addContent    doc.setFontSize(12);
    addContent(`Dear: ${candidateName}`, 10, 14, "bold");
    addContent(
      `${branchName} is delighted to offer you the ${positionType} position of Sales Person with an anticipated start date of ${anticipatedStartDate}.`
    );
    addContent(`As the Sales Person, you will be responsible for:`);

    const responsibilitiesHeading = "Responsibilities:-";
    const headingWidth = doc.getStringUnitWidth(responsibilitiesHeading) * 16; // Assuming 16 as font size for heading
    const headingPosition = (270 - headingWidth) / 2; // 210 is the width of an A4 paper in mm
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(responsibilitiesHeading, headingPosition, yPosition);
    yPosition += 10; // Adjust yPosition for spacing after the heading

    const bulletPointMaxWidth = maxWidth - 10;  // Deducting 10 units for right margin

    const addBulletPoints = (content: string, x = 30) => {
      const splitContent = doc.splitTextToSize("• " + content, bulletPointMaxWidth);
      for (let i = 0; i < splitContent.length; i++) {
        if (yPosition > pageHeight - contentBottomMargin - 10) {  // Deducting 10 units for bottom margin
          doc.addPage();
          yPosition = contentTopMargin; // Reset yPosition for new page
          addHeaderFooter(); // Add header and footer for the new page
        }
        doc.text(splitContent[i], x, yPosition);
        yPosition += 7;
      }
    };

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

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    responsibilities.forEach((responsibility) => {
      addBulletPoints(responsibility);
    });

    addContent(
      `You will report directly to Branch Manager/Supervisor at ${branchName}.`
    );
    addContent(
      `The starting salary for this position is ${startingSalary} after 1 month or 6 months and depending on your performance will be increased from ${increaseMinSalary} to ${increaseMaxSalary}. Payment is on a Monthly basis.`
    );
    addContent(
      `Rule in company, the contract will be 3 years, if you do not finish the 2 years you need to pay 5000aed.`,
      7,
      12,
      "normal",
      10,
      [255, 0, 0] // RGB for red
    );    
    addContent(
      `${branchName} offers a comprehensive benefits program, which includes medical insurance, etc.`
    );
    addContent(`Home Leave & Allowance`, 7, 12, "normal", 10, [0, 0, 0], "center"); // Here's the change to center the text
    addContent(
      `Employee shall be entitled to 30 days home leave. Employee will receive 1000aed for leave allowance.`
    );
    addContent(`Salary details are as follows:`, 7);
    addContent(`Basic Salary of: ${basicSalaryDetails}`, 7);
    addContent(`Nature Of Work Allowance: ${workAllowance}`, 7);
    addContent(`Cost Of Living Allowance: ${livingAllowance}`, 7);
    addContent(
      `Note: This offer is for one week from the date of knowing that if you agree to work will go about work after approval 1 week.`
    );
  
    const addSignatureTable = () => {
      const leftMargin = 10;
      const rightMargin = maxWidth - 90;  // Adjust as needed based on the length of the longest title + "Signature / Date:"
      const lineHeight = 7;
      
      const persons = [
          {name: "Mr. Abdulmunim Swedan", title: "Chief Financial Officer"},
          {name: "Awad Jamal Al Awad", title: "Operation Manager"},
          {name: "Laraine Kris Alcantara", title: "Hr&Administrative"},
          {name: candidateName, title: "Employee"}
        ];
  
      for (let i = 0; i < persons.length; i++) {
          if (yPosition > pageHeight - contentBottomMargin - 20) { // Adjust for two lines now
              doc.addPage();
              yPosition = contentTopMargin;
              addHeaderFooter();
          }
          
          doc.text(persons[i].name, leftMargin, yPosition);
          yPosition += lineHeight;  // Move down one line for the title
          doc.text(persons[i].title, leftMargin, yPosition);
          
          doc.text("Signature / Date:", rightMargin, yPosition);
          
          yPosition += lineHeight * 2;  // Double line height for spacing between rows
      }
  };
  
  addSignatureTable();
  addHeaderFooter();
  

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
