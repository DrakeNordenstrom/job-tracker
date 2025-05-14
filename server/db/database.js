const Database = require('better-sqlite3');
const db = new Database('jobs.db');

// Create the jobs table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company TEXT NOT NULL,
    title TEXT NOT NULL,
    status TEXT NOT NULL,
    date_applied TEXT NOT NULL,
    notes TEXT
  )
`);

module.exports = db;
