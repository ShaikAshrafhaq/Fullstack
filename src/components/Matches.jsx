import React, { useState, useEffect } from 'react'
import PageHeader from './PageHeader'
import './Matches.css'

function Matches({ setCurrentPage }) {
  const [matches, setMatches] = useState([
    { id: 1, homeTeam: 'Manchester United', awayTeam: 'Liverpool', date: '2024-03-20', time: '15:00', venue: 'Old Trafford', status: 'Scheduled' },
    { id: 2, homeTeam: 'Arsenal', awayTeam: 'Chelsea', date: '2024-03-21', time: '17:30', venue: 'Emirates Stadium', status: 'Scheduled' },
    { id: 3, homeTeam: 'Manchester City', awayTeam: 'Tottenham', date: '2024-03-22', time: '20:00', venue: 'Etihad Stadium', status: 'Scheduled' }
  ])

  const [showAddForm, setShowAddForm] = useState(false)
  useEffect(() => {
    const open = localStorage.getItem('openForm')
    if (open === 'matches') {
      setShowAddForm(true)
      localStorage.removeItem('openForm')
    }
  }, [])
  const [newMatch, setNewMatch] = useState({
    homeTeam: '',
    awayTeam: '',
    date: '',
    time: '',
    venue: '',
    status: 'Scheduled'
  })

  const handleAddMatch = (e) => {
    e.preventDefault()
    const match = {
      id: matches.length + 1,
      ...newMatch
    }
    setMatches([...matches, match])
    setNewMatch({
      homeTeam: '',
      awayTeam: '',
      date: '',
      time: '',
      venue: '',
      status: 'Scheduled'
    })
    setShowAddForm(false)
  }

  return (
    <div className="matches">
      <PageHeader title="Matches" onBack={() => setCurrentPage('dashboard')} />
      <div className="content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2>Matches</h2>
          <button className="btn" onClick={() => setShowAddForm(true)}>Schedule New Match</button>
        </div>

        {showAddForm && (
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Schedule New Match</h3>
            <form onSubmit={handleAddMatch}>
              <div className="form-group">
                <label>Home Team</label>
                <select
                  value={newMatch.homeTeam}
                  onChange={(e) => setNewMatch({ ...newMatch, homeTeam: e.target.value })}
                  required
                >
                  <option value="">Select Home Team</option>
                  <option value="Manchester United">Manchester United</option>
                  <option value="Liverpool">Liverpool</option>
                  <option value="Arsenal">Arsenal</option>
                  <option value="Chelsea">Chelsea</option>
                  <option value="Manchester City">Manchester City</option>
                  <option value="Tottenham">Tottenham</option>
                </select>
              </div>
              <div className="form-group">
                <label>Away Team</label>
                <select
                  value={newMatch.awayTeam}
                  onChange={(e) => setNewMatch({ ...newMatch, awayTeam: e.target.value })}
                  required
                >
                  <option value="">Select Away Team</option>
                  <option value="Manchester United">Manchester United</option>
                  <option value="Liverpool">Liverpool</option>
                  <option value="Arsenal">Arsenal</option>
                  <option value="Chelsea">Chelsea</option>
                  <option value="Manchester City">Manchester City</option>
                  <option value="Tottenham">Tottenham</option>
                </select>
              </div>
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={newMatch.date}
                  onChange={(e) => setNewMatch({ ...newMatch, date: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Time</label>
                <input
                  type="time"
                  value={newMatch.time}
                  onChange={(e) => setNewMatch({ ...newMatch, time: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Venue</label>
                <input
                  type="text"
                  value={newMatch.venue}
                  onChange={(e) => setNewMatch({ ...newMatch, venue: e.target.value })}
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
                <th>Date</th>
                <th>Time</th>
                <th>Home Team</th>
                <th>Away Team</th>
                <th>Venue</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {matches.map(match => (
                <tr key={match.id}>
                  <td>{match.date}</td>
                  <td>{match.time}</td>
                  <td>{match.homeTeam}</td>
                  <td>{match.awayTeam}</td>
                  <td>{match.venue}</td>
                  <td>
                    <span style={{
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      backgroundColor: match.status === 'Scheduled' ? '#3498db' : '#2ecc71',
                      color: 'white',
                      fontSize: '0.875rem'
                    }}>
                      {match.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn" style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem' }}>
                        Edit
                      </button>
                      <button className="btn" style={{ padding: '0.25rem 0.5rem', fontSize: '0.875rem', backgroundColor: '#2ecc71' }}>
                        Update Score
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

export default Matches 