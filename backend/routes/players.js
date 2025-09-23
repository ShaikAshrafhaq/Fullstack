const express = require('express');
const router = express.Router();
const { db } = require('../config/database');
const { auth, isAdmin } = require('../middleware/auth');

// Get all players
router.get('/', auth, (req, res) => {
  db.all('SELECT * FROM players ORDER BY name ASC', [], (err, players) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(players);
  });
});

// Get players by team
router.get('/team/:teamId', auth, (req, res) => {
  db.all('SELECT * FROM players WHERE teamId = ? ORDER BY name ASC', [req.params.teamId], (err, players) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(players);
  });
});

// Get single player
router.get('/:id', auth, (req, res) => {
  db.get('SELECT * FROM players WHERE id = ?', [req.params.id], (err, player) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }
    res.json(player);
  });
});

// Create new player
router.post('/', [auth, isAdmin], (req, res) => {
  const { name, teamId, position, jerseyNumber, age, nationality, status } = req.body;

  db.run(
    `INSERT INTO players (name, teamId, position, jerseyNumber, age, nationality, status, createdAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, teamId, position, jerseyNumber, age, nationality, status, new Date().toISOString()],
    function(err) {
      if (err) {
        return res.status(500).json({ message: 'Error creating player' });
      }
      res.status(201).json({
        id: this.lastID,
        name,
        teamId,
        position,
        jerseyNumber,
        age,
        nationality,
        status
      });
    }
  );
});

// Update player
router.put('/:id', [auth, isAdmin], (req, res) => {
  const { name, teamId, position, jerseyNumber, age, nationality, status } = req.body;

  db.run(
    `UPDATE players 
     SET name = ?, teamId = ?, position = ?, jerseyNumber = ?, age = ?, nationality = ?, status = ?
     WHERE id = ?`,
    [name, teamId, position, jerseyNumber, age, nationality, status, req.params.id],
    function(err) {
      if (err) {
        return res.status(500).json({ message: 'Error updating player' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Player not found' });
      }
      res.json({
        id: req.params.id,
        name,
        teamId,
        position,
        jerseyNumber,
        age,
        nationality,
        status
      });
    }
  );
});

// Delete player
router.delete('/:id', [auth, isAdmin], (req, res) => {
  db.run('DELETE FROM players WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ message: 'Error deleting player' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Player not found' });
    }
    res.json({ message: 'Player deleted successfully' });
  });
});

module.exports = router; 