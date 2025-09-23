const express = require('express');
const router = express.Router();
const { db } = require('../config/database');
const { auth, isAdmin } = require('../middleware/auth');

// Get all matches
router.get('/', auth, (req, res) => {
  db.all('SELECT * FROM matches ORDER BY date DESC, time DESC', [], (err, matches) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(matches);
  });
});

// Get matches by league
router.get('/league/:leagueId', auth, (req, res) => {
  db.all(
    'SELECT * FROM matches WHERE leagueId = ? ORDER BY date DESC, time DESC',
    [req.params.leagueId],
    (err, matches) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      res.json(matches);
    }
  );
});

// Get single match
router.get('/:id', auth, (req, res) => {
  db.get('SELECT * FROM matches WHERE id = ?', [req.params.id], (err, match) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    if (!match) {
      return res.status(404).json({ message: 'Match not found' });
    }
    res.json(match);
  });
});

// Create new match
router.post('/', [auth, isAdmin], (req, res) => {
  const { homeTeamId, awayTeamId, leagueId, date, time, venue, status } = req.body;

  db.run(
    `INSERT INTO matches (homeTeamId, awayTeamId, leagueId, date, time, venue, status, createdAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [homeTeamId, awayTeamId, leagueId, date, time, venue, status, new Date().toISOString()],
    function(err) {
      if (err) {
        return res.status(500).json({ message: 'Error creating match' });
      }
      res.status(201).json({
        id: this.lastID,
        homeTeamId,
        awayTeamId,
        leagueId,
        date,
        time,
        venue,
        status
      });
    }
  );
});

// Update match
router.put('/:id', [auth, isAdmin], (req, res) => {
  const { homeTeamId, awayTeamId, leagueId, date, time, venue, status, homeScore, awayScore } = req.body;

  db.run(
    `UPDATE matches 
     SET homeTeamId = ?, awayTeamId = ?, leagueId = ?, date = ?, time = ?, 
         venue = ?, status = ?, homeScore = ?, awayScore = ?
     WHERE id = ?`,
    [homeTeamId, awayTeamId, leagueId, date, time, venue, status, homeScore, awayScore, req.params.id],
    function(err) {
      if (err) {
        return res.status(500).json({ message: 'Error updating match' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Match not found' });
      }
      res.json({
        id: req.params.id,
        homeTeamId,
        awayTeamId,
        leagueId,
        date,
        time,
        venue,
        status,
        homeScore,
        awayScore
      });
    }
  );
});

// Delete match
router.delete('/:id', [auth, isAdmin], (req, res) => {
  db.run('DELETE FROM matches WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ message: 'Error deleting match' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Match not found' });
    }
    res.json({ message: 'Match deleted successfully' });
  });
});

module.exports = router; 