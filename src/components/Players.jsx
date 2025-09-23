import React, { useState, useEffect } from 'react'
import PageHeader from './PageHeader'
import './Players.css'

function Players({ setCurrentPage }) {
  const [players, setPlayers] = useState([
    { id: 1, name: 'Marcus Rashford', team: 'Manchester United', position: 'Forward', number: 10, age: 26 },
    { id: 2, name: 'Mohamed Salah', team: 'Liverpool', position: 'Forward', number: 11, age: 31 },
    { id: 3, name: 'Bukayo Saka', team: 'Arsenal', position: 'Midfielder', number: 7, age: 22 }
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  useEffect(() => {
    const open = localStorage.getItem('openForm')
    if (open === 'players') {
      setShowAddForm(true)
      localStorage.removeItem('openForm')
    }
  }, [])
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    team: '',
    position: '',
    number: '',
    age: ''
  })

  const handleAddPlayer = (e) => {
    e.preventDefault()
    const player = {
      id: players.length + 1,
      ...newPlayer,
      number: parseInt(newPlayer.number),
      age: parseInt(newPlayer.age)
    }
    setPlayers([...players, player])
    setNewPlayer({
      name: '',
      team: '',
      position: '',
      number: '',
      age: ''
    })
    setShowAddForm(false)
  }

  return (
    <div className="players">
      <PageHeader title="Players" onBack={() => setCurrentPage('dashboard')} />
      <div className="content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2>Players</h2>
          <button className="btn" onClick={() => setShowAddForm(true)}>Add New Player</button>
        </div>

        {showAddForm && (
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Add New Player</h3>
            <form onSubmit={handleAddPlayer}>
              <div className="form-group">
                <label>Player Name</label>
                <input
                  type="text"
                  value={newPlayer.name}
                  onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Team</label>
                <select
                  value={newPlayer.team}
                  onChange={(e) => setNewPlayer({ ...newPlayer, team: e.target.value })}
                  required
                >
                  <option value="">Select Team</option>
                  <option value="Manchester United">Manchester United</option>
                  <option value="Liverpool">Liverpool</option>
                  <option value="Arsenal">Arsenal</option>
                  <option value="Chelsea">Chelsea</option>
                  <option value="Manchester City">Manchester City</option>
                  <option value="Tottenham">Tottenham</option>
                </select>
              </div>
              <div className="form-group">
                <label>Position</label>
                <select
                  value={newPlayer.position}
                  onChange={(e) => setNewPlayer({ ...newPlayer, position: e.target.value })}
                  required
                >
                  <option value="">Select Position</option>
                  <option value="Goalkeeper">Goalkeeper</option>
                  <option value="Defender">Defender</option>
                  <option value="Midfielder">Midfielder</option>
                  <option value="Forward">Forward</option>
                </select>
              </div>
              <div className="form-group">
                <label>Jersey Number</label>
                <input
                  type="number"
                  value={newPlayer.number}
                  onChange={(e) => setNewPlayer({ ...newPlayer, number: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  value={newPlayer.age}
                  onChange={(e) => setNewPlayer({ ...newPlayer, age: e.target.value })}
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
                <th>Name</th>
                <th>Team</th>
                <th>Position</th>
                <th>Number</th>
                <th>Age</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {players.map(player => (
                <tr key={player.id}>
                  <td>{player.name}</td>
                  <td>{player.team}</td>
                  <td>{player.position}</td>
                  <td>{player.number}</td>
                  <td>{player.age}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn" style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}>
                        Edit
                      </button>
                      <button className="btn" style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem', backgroundColor: '#3498db' }}>
                        View Stats
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

export default Players 