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

// DELETE a job
router.delete('/:id', (req, res) => {
    const { id } = req.params;
  
    const stmt = db.prepare('DELETE FROM jobs WHERE id = ?');
    const info = stmt.run(id);
  
    if (info.changes === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }
  
    res.json({ success: true });
  });  

  // UPDATE a job
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { company, title, status, date_applied, notes } = req.body;
  
    const stmt = db.prepare(`
      UPDATE jobs
      SET company = ?, title = ?, status = ?, date_applied = ?, notes = ?
      WHERE id = ?
    `);
    const info = stmt.run(company, title, status, date_applied, notes, id);
  
    if (info.changes === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }
  
    res.json({ success: true });
  });
  
module.exports = router;
