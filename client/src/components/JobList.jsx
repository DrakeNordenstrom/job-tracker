import { useEffect, useState } from 'react';
import EditModal from './EditModal';

export default function JobList() {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);

  //for filtering
  const [filterStatus, setFilterStatus] = useState('All');
  const [sortField, setSortField] = useState('date_applied');
  const [sortDirection, setSortDirection] = useState('desc');

  const fetchJobs = () => {
    fetch('http://localhost:3001/jobs')
      .then((res) => res.json())
      .then((data) => setJobs(data));
  };

  //filtering logic
  const filteredJobs = jobs
  .filter((job) => filterStatus === 'All' || job.status === filterStatus)
  .sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];

    if (sortField === 'date_applied') {
      aVal = new Date(aVal);
      bVal = new Date(bVal);
    }

    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });


  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this job?')) return;

    const res = await fetch(`http://localhost:3001/jobs/${id}`, {
      method: 'DELETE',
    });
    if (res.ok) fetchJobs();
  };

  return (
    <div>
      <h2>Job Applications</h2>
  
      {/*FILTER & SORT CONTROLS*/}
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Filter by Status:
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="All">All</option>
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
        </label>
  
        <label style={{ marginLeft: '1rem' }}>
          Sort by:
          <select value={sortField} onChange={(e) => setSortField(e.target.value)}>
            <option value="date_applied">Date Applied</option>
            <option value="company">Company</option>
            <option value="status">Status</option>
          </select>
  
          <select value={sortDirection} onChange={(e) => setSortDirection(e.target.value)}>
            <option value="asc">↑ Asc</option>
            <option value="desc">↓ Desc</option>
          </select>
        </label>
      </div>
  
      {/*DISPLAY FILTERED JOBS INSTEAD OF ORIGINAL JOBS*/}
      {filteredJobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <ul>
          {filteredJobs.map((job) => (
            <li key={job.id}>
              <strong>{job.title}</strong> @ {job.company} — {job.status}
              <br />
              <small>Applied: {job.date_applied}</small>
              <p>{job.notes}</p>
              <button onClick={() => handleDelete(job.id)}>🗑️ Delete</button>
              <button onClick={() => setEditingJob(job)}>✏️ Edit</button>
            </li>
          ))}
        </ul>
      )}
  
      {editingJob && (
        <EditModal
          job={editingJob}
          onClose={() => setEditingJob(null)}
          onSave={fetchJobs}
        />
      )}
    </div>
  );
  
}
