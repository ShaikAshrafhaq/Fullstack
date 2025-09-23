import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Leagues from './components/Leagues'
import Teams from './components/Teams'
import Matches from './components/Matches'
import Players from './components/Players'
import Esports from './components/Esports'
import GetStarted from './components/GetStarted'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    // Check if user is logged in on component mount
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderPage = () => {
    if (!isAuthenticated) {
      return <GetStarted onAuthenticate={() => setIsAuthenticated(true)} />
    }

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard setCurrentPage={setCurrentPage} />
      case 'leagues':
        return <Leagues setCurrentPage={setCurrentPage} />
      case 'teams':
        return <Teams setCurrentPage={setCurrentPage} />
      case 'matches':
        return <Matches setCurrentPage={setCurrentPage} />
      case 'players':
        return <Players setCurrentPage={setCurrentPage} />
      case 'esports':
        return <Esports setCurrentPage={setCurrentPage} />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="app">
      {isAuthenticated && (
        <>
          <Header 
            onLogout={handleLogout} 
            user={currentUser} 
            onToggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
          />
          <Sidebar 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage} 
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />
        </>
      )}
      <main className="content">
        {renderPage()}
      </main>
    </div>
  )
}

export default App
