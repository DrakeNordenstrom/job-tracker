# Job Application Tracker

A simple full-stack app for tracking job applications, built with:

- ⚛️ React + Vite (frontend)
- 🚀 Express.js (backend)
- 🗃️ SQLite (database)

## Features

✅ Add job applications  
✅ Track status (Applied, Interviewing, Offer, Rejected)  
✅ Store company, title, date applied, notes  
⬜ Display jobs in a list (in progress)  
⬜ Edit and delete entries  
⬜ Filter/search jobs

## Project Structure

job-tracker/

├── client/ # React frontend

├── server/ # Express backend with SQLite

└── README.md


## Getting Started

### Prerequisites

- Node.js (v18+ recommended)

### Install and Run

1. Clone repo
   
git clone https://github.com/DrakeNordenstrom/job-tracker.git

cd job-tracker

2. Start backend

cd server

npm install

node index.js

3. Start frontend
   
cd ../client

npm install

npm run dev

4. Open browser at https://localhost:PORT
