import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const HabitForm = () => {
  const [formData, setFormData] = useState({ name: '', description: '', category: '', tags: [], frequency: '' });
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const fetchHabit = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/habits}`);
          setFormData(response.data);
        } catch (err) {
          console.error('Error fetching habit:', err);
          setError('Failed to load habit details.');
        }
      };
      fetchHabit();
    }
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleTagsChange = e => {
    const tags = e.target.value.split(',').map(tag => tag.trim());
    setFormData(prevData => ({ ...prevData, tags }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/habits/${id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/habits', formData);
      }
      navigate('/main');
    } catch (err) {
      console.error('Error saving habit:', err);
      setError('Failed to save habit.');
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#f9f9f9' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>{id ? 'Edit Habit' : 'Add New Habit'}</h1>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Habit Name"
          required
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px' }}
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px' }}
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px' }}
        >
          <option value="">Select Category</option>
          <option value="health">Health</option>
          <option value="productivity">Productivity</option>
          <option value="mindfulness">Mindfulness</option>
        </select>
        <input
          type="text"
          name="tags"
          value={formData.tags.join(', ')}
          onChange={handleTagsChange}
          placeholder="Tags (comma separated)"
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px' }}
        />
        <input
          type="text"
          name="frequency"
          value={formData.frequency}
          onChange={handleChange}
          placeholder="Frequency (e.g., daily, weekly)"
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px' }}
        />
        <button
          type="submit"
          style={{ padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#4CAF50', color: 'white', fontSize: '16px', cursor: 'pointer' }}
        >
          Save Habit
        </button>
      </form>
    </div>
  );
};

export default HabitForm;
