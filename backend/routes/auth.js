const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../config/database');

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if user already exists
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      const newUser = {
        username,
        email,
        password: hashedPassword,
        role: role || 'user',
        createdAt: new Date().toISOString()
      };

      db.run(
        'INSERT INTO users (username, email, password, role, createdAt) VALUES (?, ?, ?, ?, ?)',
        [newUser.username, newUser.email, newUser.password, newUser.role, newUser.createdAt],
        function(err) {
          if (err) {
            return res.status(500).json({ message: 'Error creating user' });
          }

          // Create token
          const token = jwt.sign(
            { id: this.lastID, role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
          );

          res.status(201).json({
            token,
            user: {
              id: this.lastID,
              username: newUser.username,
              email: newUser.email,
              role: newUser.role
            }
          });
        }
      );
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login user
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Database error' });
      }
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Create token
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );

      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role
        }
      });
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 