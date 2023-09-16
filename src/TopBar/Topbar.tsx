import './Topbar.css'

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
    </div>
  );
}

export default TopBar;
