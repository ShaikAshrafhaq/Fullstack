import './Sidebar.css';

const Sidebar = ({ currentPage, setCurrentPage, isOpen, onClose }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'leagues', label: 'Leagues', icon: '🏆' },
    { id: 'teams', label: 'Teams', icon: '👥' },
    { id: 'matches', label: 'Matches', icon: '⚽' },
    { id: 'players', label: 'Players', icon: '👤' },
    { id: 'esports', label: 'Esports', icon: '🎮' }
  ];

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <img src="/logo.jpg" alt="SportsHub Logo" className="sidebar-logo" />
          <span className="sidebar-title">SportsHub</span>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => {
                setCurrentPage(item.id);
                onClose();
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;