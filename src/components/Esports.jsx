import React, { useState, useEffect } from 'react'
import './Players.css'

function Esports({ setCurrentPage }) {
  const [teams, setTeams] = useState([
    { id: 1, name: 'Dragons', game: 'Valorant', players: 5, coach: 'Coach Ray' },
    { id: 2, name: 'Titans', game: 'CS2', players: 5, coach: 'Coach Lee' }
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  const [newTeam, setNewTeam] = useState({ name: '', game: '', players: '', coach: '' })

  useEffect(() => {
    const open = localStorage.getItem('openForm')
    if (open === 'esports') {
      setShowAddForm(true)
      localStorage.removeItem('openForm')
    }
  }, [])

  const handleAddTeam = (e) => {
    e.preventDefault()
    const team = {
      id: teams.length + 1,
      ...newTeam,
      players: parseInt(newTeam.players)
    }
    setTeams([...teams, team])
    setNewTeam({ name: '', game: '', players: '', coach: '' })
    setShowAddForm(false)
  }

  return (
    <div className="players">
      <div className="page-header" style={{ marginBottom: '1rem' }}>
        <h1>Esports</h1>
        <button className="back-button" onClick={() => setCurrentPage('dashboard')}>← Back to Dashboard</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2>Esports Teams</h2>
        <button className="btn" onClick={() => setShowAddForm(true)}>Add New Esports Team</button>
      </div>

      {showAddForm && (
        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Add New Esports Team</h3>
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
              <label>Game</label>
              <select
                value={newTeam.game}
                onChange={(e) => setNewTeam({ ...newTeam, game: e.target.value })}
                required
              >
                <option value="">Select Game</option>
                <option value="Valorant">Valorant</option>
                <option value="CS2">CS2</option>
                <option value="Dota 2">Dota 2</option>
                <option value="League of Legends">League of Legends</option>
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
              <th>Game</th>
              <th>Players</th>
              <th>Coach</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {teams.map(team => (
              <tr key={team.id}>
                <td>{team.name}</td>
                <td>{team.game}</td>
                <td>{team.players}</td>
                <td>{team.coach}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn" style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}>
                      Edit
                    </button>
                    <button className="btn" style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem', backgroundColor: '#3498db' }}>
                      View Roster
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

export default Esports


