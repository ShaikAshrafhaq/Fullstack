const express = require('express');
const router = express.Router();
const { db } = require('../config/database');
const { auth, isAdmin } = require('../middleware/auth');

// Get all leagues
router.get('/', auth, (req, res) => {
  db.all('SELECT * FROM leagues ORDER BY createdAt DESC', [], (err, leagues) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(leagues);
  });
});

// Get single league
router.get('/:id', auth, (req, res) => {
  db.get('SELECT * FROM leagues WHERE id = ?', [req.params.id], (err, league) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    if (!league) {
      return res.status(404).json({ message: 'League not found' });
    }
    res.json(league);
  });
});

// Create new league
router.post('/', [auth, isAdmin], (req, res) => {
  const { name, description, season, status, startDate, endDate, totalTeams } = req.body;

  db.run(
    `INSERT INTO leagues (name, description, season, status, startDate, endDate, totalTeams, createdAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [name, description, season, status, startDate, endDate, totalTeams, new Date().toISOString()],
    function(err) {
      if (err) {
        return res.status(500).json({ message: 'Error creating league' });
      }
      res.status(201).json({
        id: this.lastID,
        name,
        description,
        season,
        status,
        startDate,
        endDate,
        totalTeams
      });
    }
  );
});

// Update league
router.put('/:id', [auth, isAdmin], (req, res) => {
  const { name, description, season, status, startDate, endDate, totalTeams } = req.body;

  db.run(
    `UPDATE leagues 
     SET name = ?, description = ?, season = ?, status = ?, startDate = ?, endDate = ?, totalTeams = ?
     WHERE id = ?`,
    [name, description, season, status, startDate, endDate, totalTeams, req.params.id],
    function(err) {
      if (err) {
        return res.status(500).json({ message: 'Error updating league' });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: 'League not found' });
      }
      res.json({
        id: req.params.id,
        name,
        description,
        season,
        status,
        startDate,
        endDate,
        totalTeams
      });
    }
  );
});

// Delete league
router.delete('/:id', [auth, isAdmin], (req, res) => {
  db.run('DELETE FROM leagues WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      return res.status(500).json({ message: 'Error deleting league' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'League not found' });
    }
    res.json({ message: 'League deleted successfully' });
  });
});

module.exports = router; 