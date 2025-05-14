const express = require('express');
const router = express.Router();
const db = require('../db/database');

// GET all jobs
router.get('/', (req, res) => {
  const jobs = db.prepare('SELECT * FROM jobs').all();
  res.json(jobs);
});

// POST new job
router.post('/', (req, res) => {
  const { company, title, status, date_applied, notes } = req.body;

  if (!company || !title || !status || !date_applied) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const stmt = db.prepare(`
    INSERT INTO jobs (company, title, status, date_applied, notes)
    VALUES (?, ?, ?, ?, ?)
  `);
  const info = stmt.run(company, title, status, date_applied, notes);

  const newJob = { id: info.lastInsertRowid, company, title, status, date_applied, notes };
  res.status(201).json(newJob);
});

module.exports = router;
