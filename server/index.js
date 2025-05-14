const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

const jobsRoutes = require('./routes/jobs');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/jobs', jobsRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
