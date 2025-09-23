import { useState } from 'react';
import './Dashboard.css';

const Dashboard = ({ setCurrentPage }) => {
  const [editingItem, setEditingItem] = useState(null);
  const [stats, setStats] = useState([
    {
      id: 'leagues',
      title: 'Leagues',
      count: 5,
      icon: '🏆',
      color: '#4CAF50'
    },
    {
      id: 'teams',
      title: 'Teams',
      count: 20,
      icon: '👥',
      color: '#2196F3'
    },
    {
      id: 'matches',
      title: 'Matches',
      count: 15,
      icon: '⚽',
      color: '#FF9800'
    },
    {
      id: 'players',
      title: 'Players',
      count: 200,
      icon: '👤',
      color: '#9C27B0'
    },
    {
      id: 'esports',
      title: 'Esports Teams',
      count: 8,
      icon: '🎮',
      color: '#0b2772'
    }
  ]);

  const [recentMatches, setRecentMatches] = useState([
    { id: 1, homeTeam: 'Team A', awayTeam: 'Team B', score: '2-1', date: '2024-03-15' },
    { id: 2, homeTeam: 'Team C', awayTeam: 'Team D', score: '0-0', date: '2024-03-14' },
    { id: 3, homeTeam: 'Team E', awayTeam: 'Team F', score: '3-2', date: '2024-03-13' }
  ]);

  const handleEdit = (type, id) => {
    setEditingItem({ type, id });
  };

  const handleStatChange = (statId, newCount) => {
    setStats(stats.map(stat => 
      stat.id === statId ? { ...stat, count: parseInt(newCount) || 0 } : stat
    ));
  };

  const handleMatchChange = (matchId, field, value) => {
    setRecentMatches(recentMatches.map(match =>
      match.id === matchId ? { ...match, [field]: value } : match
    ));
  };

  const handleSave = (type, id) => {
    // Here you would typically make an API call to update the data
    console.log('Saving:', type, id);
    setEditingItem(null);
  };

  const handleCancel = () => {
    setEditingItem(null);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
      </div>
      
      <div className="stats-grid">
        {stats.map(stat => (
          <div key={stat.id} className="stat-card" style={{ borderColor: stat.color }}>
            <div className="stat-icon" style={{ backgroundColor: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-info">
              <h3>{stat.title}</h3>
              {editingItem?.type === 'stat' && editingItem?.id === stat.id ? (
                <div className="edit-form">
                  <input 
                    type="number" 
                    value={stat.count}
                    onChange={(e) => handleStatChange(stat.id, e.target.value)}
                    className="edit-input"
                  />
                  <div className="edit-actions">
                    <button 
                      className="edit-button save"
                      onClick={() => handleSave('stat', stat.id)}
                    >
                      Save
                    </button>
                    <button 
                      className="edit-button cancel"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="stat-content">
                  <p className="stat-count">{stat.count}</p>
                  <button 
                    className="edit-icon"
                    onClick={() => handleEdit('stat', stat.id)}
                  >
                    ✏️
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-sections">
        <div className="section recent-matches">
          <div className="section-header">
            <h2>Recent Matches</h2>
            <button 
              className="add-button"
              onClick={() => {
                localStorage.setItem('openForm', 'matches');
                if (typeof setCurrentPage === 'function') {
                  setCurrentPage('matches');
                }
              }}
            >
              Add Match
            </button>
          </div>
          <div className="matches-list">
            {recentMatches.map(match => (
              <div key={match.id} className="match-card">
                {editingItem?.type === 'match' && editingItem?.id === match.id ? (
                  <div className="edit-form">
                    <div className="edit-inputs">
                      <input 
                        type="text" 
                        value={match.homeTeam}
                        onChange={(e) => handleMatchChange(match.id, 'homeTeam', e.target.value)}
                        placeholder="Home Team"
                        className="edit-input"
                      />
                      <input 
                        type="text" 
                        value={match.score}
                        onChange={(e) => handleMatchChange(match.id, 'score', e.target.value)}
                        placeholder="Score"
                        className="edit-input"
                      />
                      <input 
                        type="text" 
                        value={match.awayTeam}
                        onChange={(e) => handleMatchChange(match.id, 'awayTeam', e.target.value)}
                        placeholder="Away Team"
                        className="edit-input"
                      />
                    </div>
                    <div className="edit-actions">
                      <button 
                        className="edit-button save"
                        onClick={() => handleSave('match', match.id)}
                      >
                        Save
                      </button>
                      <button 
                        className="edit-button cancel"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="match-teams">
                      <span>{match.homeTeam}</span>
                      <span className="match-score">{match.score}</span>
                      <span>{match.awayTeam}</span>
                    </div>
                    <div className="match-footer">
                      <span className="match-date">{match.date}</span>
                      <button 
                        className="edit-icon"
                        onClick={() => handleEdit('match', match.id)}
                      >
                        ✏️
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="section quick-actions">
          <div className="section-header">
            <h2>Quick Actions</h2>
          </div>
          <div className="actions-grid">
            <button
              className="action-button"
              onClick={() => {
                localStorage.setItem('openForm', 'leagues');
                setCurrentPage('leagues');
              }}
            >
              <span className="action-icon">➕</span>
              Add New League
            </button>
            <button
              className="action-button"
              onClick={() => {
                localStorage.setItem('openForm', 'teams');
                setCurrentPage('teams');
              }}
            >
              <span className="action-icon">➕</span>
              Add New Team
            </button>
            <button
              className="action-button"
              onClick={() => {
                localStorage.setItem('openForm', 'matches');
                setCurrentPage('matches');
              }}
            >
              <span className="action-icon">📅</span>
              Schedule Match
            </button>
            <button
              className="action-button"
              onClick={() => {
                localStorage.setItem('openForm', 'players');
                setCurrentPage('players');
              }}
            >
              <span className="action-icon">👤</span>
              Add New Player
            </button>
            <button
              className="action-button"
              onClick={() => {
                localStorage.setItem('openForm', 'esports');
                setCurrentPage('esports');
              }}
            >
              <span className="action-icon">🎮</span>
              Add Esports Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 