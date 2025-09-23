import React, { useState, useEffect } from 'react'

function Teams({ setCurrentPage }) {
  const [teams, setTeams] = useState([
    { id: 1, name: 'Manchester United', league: 'Premier League', players: 25, coach: 'Erik ten Hag' },
    { id: 2, name: 'Liverpool', league: 'Premier League', players: 23, coach: 'Jürgen Klopp' },
    { id: 3, name: 'Arsenal', league: 'Premier League', players: 24, coach: 'Mikel Arteta' }
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  useEffect(() => {
    const open = localStorage.getItem('openForm')
    if (open === 'teams') {
      setShowAddForm(true)
      localStorage.removeItem('openForm')
    }
  }, [])
  const [newTeam, setNewTeam] = useState({ name: '', league: '', players: '', coach: '' })

  const handleAddTeam = (e) => {
    e.preventDefault()
    const team = {
      id: teams.length + 1,
      ...newTeam,
      players: parseInt(newTeam.players)
    }
    setTeams([...teams, team])
    setNewTeam({ name: '', league: '', players: '', coach: '' })
    setShowAddForm(false)
  }

  return (
    <div>
      <div className="page-header" style={{ marginBottom: '1rem' }}>
        <h1>Teams</h1>
        <button className="back-button" onClick={() => setCurrentPage('dashboard')}>← Back to Dashboard</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>Teams</h2>
        <button className="btn" onClick={() => setShowAddForm(true)}>Add New Team</button>
      </div>

      {showAddForm && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Add New Team</h3>
          <form onSubmit={handleAddTeam}>
            <div className="form-group">
              <label>Team Name</label>
              <input
                type="text"
                value={newTeam.name}
                onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>League</label>
              <select
                value={newTeam.league}
                onChange={(e) => setNewTeam({ ...newTeam, league: e.target.value })}
                required
              >
                <option value="">Select League</option>
                <option value="Premier League">Premier League</option>
                <option value="Championship">Championship</option>
                <option value="League One">League One</option>
              </select>
            </div>
            <div className="form-group">
              <label>Number of Players</label>
              <input
                type="number"
                value={newTeam.players}
                onChange={(e) => setNewTeam({ ...newTeam, players: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Coach</label>
              <input
                type="text"
                value={newTeam.coach}
                onChange={(e) => setNewTeam({ ...newTeam, coach: e.target.value })}
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
              <th>Team Name</th>
              <th>League</th>
              <th>Players</th>
              <th>Coach</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teams.map(team => (
              <tr key={team.id}>
                <td>{team.name}</td>
                <td>{team.league}</td>
                <td>{team.players}</td>
                <td>{team.coach}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn" style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}>
                      Edit
                    </button>
                    <button className="btn" style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem', backgroundColor: '#3498db' }}>
                      View Players
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Teams 