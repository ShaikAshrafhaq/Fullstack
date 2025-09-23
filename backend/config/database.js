const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create database connection
const db = new sqlite3.Database(
  path.join(__dirname, '../data/sports_league.db'),
  (err) => {
    if (err) {
      console.error('Error connecting to database:', err);
    } else {
      console.log('Connected to SQLite database');
    }
  }
);

// Initialize database tables
const initDatabase = () => {
  db.serialize(() => {
    // Users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL,
      createdAt TEXT NOT NULL
    )`);

    // Leagues table
    db.run(`CREATE TABLE IF NOT EXISTS leagues (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      season TEXT NOT NULL,
      status TEXT NOT NULL,
      startDate TEXT NOT NULL,
      endDate TEXT NOT NULL,
      totalTeams INTEGER NOT NULL,
      createdAt TEXT NOT NULL
    )`);

    // Teams table
    db.run(`CREATE TABLE IF NOT EXISTS teams (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      leagueId INTEGER NOT NULL,
      manager TEXT,
      stadium TEXT,
      founded TEXT,
      status TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      FOREIGN KEY (leagueId) REFERENCES leagues (id)
    )`);

    // Players table
    db.run(`CREATE TABLE IF NOT EXISTS players (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      teamId INTEGER NOT NULL,
      position TEXT NOT NULL,
      jerseyNumber INTEGER NOT NULL,
      age INTEGER NOT NULL,
      nationality TEXT,
      status TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      FOREIGN KEY (teamId) REFERENCES teams (id)
    )`);

    // Matches table
    db.run(`CREATE TABLE IF NOT EXISTS matches (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      homeTeamId INTEGER NOT NULL,
      awayTeamId INTEGER NOT NULL,
      leagueId INTEGER NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      venue TEXT NOT NULL,
      status TEXT NOT NULL,
      homeScore INTEGER,
      awayScore INTEGER,
      createdAt TEXT NOT NULL,
      FOREIGN KEY (homeTeamId) REFERENCES teams (id),
      FOREIGN KEY (awayTeamId) REFERENCES teams (id),
      FOREIGN KEY (leagueId) REFERENCES leagues (id)
    )`);

    // Player Stats table
    db.run(`CREATE TABLE IF NOT EXISTS playerStats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      playerId INTEGER NOT NULL,
      season TEXT NOT NULL,
      matchesPlayed INTEGER NOT NULL,
      goals INTEGER NOT NULL,
      assists INTEGER NOT NULL,
      yellowCards INTEGER NOT NULL,
      redCards INTEGER NOT NULL,
      createdAt TEXT NOT NULL,
      FOREIGN KEY (playerId) REFERENCES players (id)
    )`);

    // League Standings table
    db.run(`CREATE TABLE IF NOT EXISTS leagueStandings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      leagueId INTEGER NOT NULL,
      teamId INTEGER NOT NULL,
      position INTEGER NOT NULL,
      played INTEGER NOT NULL,
      won INTEGER NOT NULL,
      drawn INTEGER NOT NULL,
      lost INTEGER NOT NULL,
      goalsFor INTEGER NOT NULL,
      goalsAgainst INTEGER NOT NULL,
      points INTEGER NOT NULL,
      createdAt TEXT NOT NULL,
      FOREIGN KEY (leagueId) REFERENCES leagues (id),
      FOREIGN KEY (teamId) REFERENCES teams (id)
    )`);
  });
};

// Initialize database on startup
initDatabase();

module.exports = { db }; 