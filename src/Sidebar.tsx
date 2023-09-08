import "./Sidebar.css";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "./authSlice";
import { commonButtons, positionButtons } from "./buttonConfig"; // <-- Import the button config

// Define the types for the props
type User = {
  name: string;
  photo: string;
  position: string;  // Added the position property to the User type
};

type SidebarProps = {
  currentUser: User;
  toggleSidebar: () => void;
  className?: string;
};

function Sidebar({ currentUser, className }: SidebarProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/Login");
  };

  const positionConfig = positionButtons.find(p => p.position === currentUser.position);
  const positionSpecificButtons = positionConfig ? positionConfig.buttons : [];

  return (
    <div className={`sidebar ${className}`}>
      <div className="user-profile">
        <img src={currentUser.photo} alt={currentUser.name} />
        <span>{currentUser.name}</span>
      </div>
      <div className="menu-items">

        {commonButtons.map((buttonLabel) => (
          <Link to={`/${buttonLabel.toLowerCase()}`} key={buttonLabel}>
            <button>{buttonLabel}</button>
          </Link>
        ))}

        {/* Render position-specific buttons */}
        {positionSpecificButtons.map((buttonLabel) => (
          <Link to={`/${buttonLabel.toLowerCase().replace(" ", "-")}`} key={buttonLabel}>
            <button>{buttonLabel}</button>
          </Link>
        ))}

        {/* Add more buttons/links as needed */}
      </div>
      <div className="logout">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default Sidebar;
