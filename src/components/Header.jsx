import './Header.css';

const Header = ({ onLogout, user, onToggleSidebar, isSidebarOpen }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <button 
            className="menu-button"
            onClick={onToggleSidebar}
            aria-label="Toggle menu"
          >
            <span className={`menu-icon ${isSidebarOpen ? 'open' : ''}`}></span>
          </button>
          <h1>Sports League</h1>
        </div>
        <div className="user-section">
          <span className="user-name">Welcome, {user?.name}</span>
          <button onClick={onLogout} className="logout-button">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 