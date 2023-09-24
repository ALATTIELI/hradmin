import './Topbar.css';
import NotificationsIcon from '@mui/icons-material/Notifications';

type TopBarProps = {
  toggleSidebar: () => void;
};

function TopBar({ toggleSidebar }: TopBarProps) {
  return (
    <div className="topbar">
      <button className="menu-icon" onClick={toggleSidebar}>
        ☰
      </button>
      <input type="text" placeholder="Search..." className="searchbar" />
      <div className="notification-icon">
        <NotificationsIcon /> {/* Use NotificationsIcon here */}
      </div>
    </div>
  );
}

export default TopBar;
