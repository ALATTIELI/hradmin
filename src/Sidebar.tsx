import './Sidebar.css'


// Define the types for the props
type User = {
  name: string;
  photo: string;
};

type SidebarProps = {
    currentUser: User;
    toggleSidebar: () => void;
    className?: string; // Add this line
  };
  

// Use the SidebarProps type for the function's parameters
function Sidebar({ currentUser, toggleSidebar, className }: SidebarProps) {
    return (
        <div className={`sidebar ${className}`}>
        <div className="user-profile">
        <img src={currentUser.photo} alt={currentUser.name} />
        <span>{currentUser.name}</span>
      </div>
      <div className="menu-items">
        <button>Dashboard</button>
        <button>Settings</button>
        <button>Reports</button>
        {/* Add more buttons/links as needed */}
      </div>
      <div className="logout">
        <button onClick={toggleSidebar}>Logout</button>
      </div>
    </div>
  );
}

export default Sidebar;
