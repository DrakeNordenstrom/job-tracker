import { useState, useEffect } from 'react';

export default function EditModal({ job, onClose, onSave }) {
  const [formData, setFormData] = useState({ ...job });

  useEffect(() => {
    setFormData({ ...job }); // sync when modal opens
  }, [job]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3001/jobs/${formData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      onSave(); // reload jobs
      onClose(); // close modal
    } else {
      alert('Update failed');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Job</h2>
        <form onSubmit={handleSubmit}>
          <input name="company" value={formData.company} onChange={handleChange} />
          <input name="title" value={formData.title} onChange={handleChange} />
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Applied">Applied</option>
            <option value="Interviewing">Interviewing</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
          <input type="date" name="date_applied" value={formData.date_applied} onChange={handleChange} />
          <textarea name="notes" value={formData.notes} onChange={handleChange} />

          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
}
