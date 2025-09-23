import React, { useState, useEffect } from 'react'
import PageHeader from './PageHeader';
import './Leagues.css';

function Leagues({ setCurrentPage }) {
  const [leagues, setLeagues] = useState([
    { id: 1, name: 'Premier League', teams: 20, season: '2023-2024', status: 'Active' },
    { id: 2, name: 'Championship', teams: 24, season: '2023-2024', status: 'Active' },
    { id: 3, name: 'League One', teams: 24, season: '2023-2024', status: 'Active' },
    { id: 4, name: 'Esports League', teams: 12, season: '2024', status: 'Active' }
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  useEffect(() => {
    const open = localStorage.getItem('openForm')
    if (open === 'leagues') {
      setShowAddForm(true)
      localStorage.removeItem('openForm')
    }
  }, [])
  const [newLeague, setNewLeague] = useState({ name: '', teams: '', season: '', status: 'Active' })

  const handleAddLeague = (e) => {
    e.preventDefault()
    const league = {
      id: leagues.length + 1,
      ...newLeague,
      teams: parseInt(newLeague.teams)
    }
    setLeagues([...leagues, league])
    setNewLeague({ name: '', teams: '', season: '', status: 'Active' })
    setShowAddForm(false)
  }

  return (
    <div className="leagues">
      <PageHeader title="Leagues" onBack={() => setCurrentPage('dashboard')} />
      <div className="content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2>Leagues</h2>
          <button className="btn" onClick={() => setShowAddForm(true)}>Add New League</button>
        </div>

        {showAddForm && (
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Add New League</h3>
            <form onSubmit={handleAddLeague}>
              <div className="form-group">
                <label>League Name</label>
                <input
                  type="text"
                  value={newLeague.name}
                  onChange={(e) => setNewLeague({ ...newLeague, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Number of Teams</label>
                <input
                  type="number"
                  value={newLeague.teams}
                  onChange={(e) => setNewLeague({ ...newLeague, teams: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Season</label>
                <input
                  type="text"
                  value={newLeague.season}
                  onChange={(e) => setNewLeague({ ...newLeague, season: e.target.value })}
                  required
                />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="submit" className="btn">Save</button>
                <button type="button" className="btn" style={{ backgroundColor: '#e74c3c' }} onClick={() => setShowAddForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="card">
          <table className="table">
            <thead>
              <tr>
                <th>League Name</th>
                <th>Teams</th>
                <th>Season</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leagues.map(league => (
                <tr key={league.id}>
                  <td>{league.name}</td>
                  <td>{league.teams}</td>
                  <td>{league.season}</td>
                  <td>
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      backgroundColor: league.status === 'Active' ? '#2ecc71' : '#e74c3c',
                      color: 'white',
                      fontSize: '0.875rem'
                    }}>
                      {league.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn" style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem', backgroundColor: '#0b2772' }}>
                        Edit
                      </button>
                      <button className="btn" style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem', backgroundColor: '#3498db' }}>
                        View Teams
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Leagues 