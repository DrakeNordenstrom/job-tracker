import { useState } from 'react';

export default function JobForm() {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    status: 'Applied',
    date_applied: '',
    notes: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        console.log('Job saved:', data);
        //alert('Job application added!');
        setFormData({
          company: '',
          title: '',
          status: 'Applied',
          date_applied: '',
          notes: '',
        });
        //fetchJobs();
        window.location.reload();
      } else {
        alert('Failed to save job.');
      }
    } catch (err) {
      console.error(err);
      alert('Error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Job Info</h2>

      <input
        type="text"
        name="company"
        placeholder="Company"
        value={formData.company}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="title"
        placeholder="Job Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <select name="status" value={formData.status} onChange={handleChange}>
        <option value="Applied">Applied</option>
        <option value="Interviewing">Interviewing</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>
      <input
        type="date"
        name="date_applied"
        value={formData.date_applied}
        onChange={handleChange}
        required
      />
      <textarea
        name="notes"
        placeholder="Notes"
        value={formData.notes}
        onChange={handleChange}
      />

      <button type="submit">Add Job</button>
    </form>
  );
}
