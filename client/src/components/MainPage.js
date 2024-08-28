import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MainPage = () => {
  const [habits, setHabits] = useState([]);
  const [filteredHabits, setFilteredHabits] = useState([]);
  const [filter, setFilter] = useState({ category: '', tag: '', search: '' });

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/habits');
        setHabits(response.data);
        setFilteredHabits(response.data);
      } catch (error) {
        console.error('Error fetching habits:', error);
      }
    };
    fetchHabits();
  }, []);

  const handleDelete = async id => {
    try {
      await axios.delete(`http://localhost:5000/api/habits/${id}`);
      setFilteredHabits(filteredHabits.filter(habit => habit._id !== id));
    } catch (error) {
      console.error('Error deleting habit:', error);
    }
  };

  const handleFilterChange = e => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
    filterHabits({ ...filter, [name]: value });
  };

  const filterHabits = filterCriteria => {
    let filtered = habits;

    if (filterCriteria.category) {
      filtered = filtered.filter(habit => habit.category === filterCriteria.category);
    }
    if (filterCriteria.tag) {
      filtered = filtered.filter(habit => habit.tags.includes(filterCriteria.tag));
    }
    if (filterCriteria.search) {
      filtered = filtered.filter(habit => habit.name.toLowerCase().includes(filterCriteria.search.toLowerCase()));
    }

    setFilteredHabits(filtered);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Daily Habit Tracker</h1>
      <Link to="/add-habit">
        <button style={{ display: 'block', width: '100%', padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#4CAF50', color: 'white', fontSize: '16px', cursor: 'pointer', marginBottom: '20px' }}>
          Add Habit
        </button>
      </Link>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search habits"
          name="search"
          value={filter.search}
          onChange={handleFilterChange}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px' }}
        />
        <select
          name="category"
          value={filter.category}
          onChange={handleFilterChange}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px' }}
        >
          <option value="">All Categories</option>
          <option value="health">Health</option>
          <option value="productivity">Productivity</option>
          <option value="mindfulness">Mindfulness</option>
        </select>
        <input
          type="text"
          placeholder="Filter by tag"
          name="tag"
          value={filter.tag}
          onChange={handleFilterChange}
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '16px' }}
        />
      </div>
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {filteredHabits.map(habit => (
          <li key={habit._id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', marginBottom: '10px', borderRadius: '4px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            <span style={{ fontSize: '16px', color: '#333' }}>{habit.name} - {habit.category}</span>
            <div>
              <Link to={`/edit-habit/${habit._id}`}>
                <button style={{ padding: '5px 10px', borderRadius: '4px', border: 'none', backgroundColor: '#ffa500', color: 'white', fontSize: '14px', cursor: 'pointer', marginRight: '10px' }}>
                  Edit
                </button>
              </Link>
              <button onClick={() => handleDelete(habit._id)} style={{ padding: '5px 10px', borderRadius: '4px', border: 'none', backgroundColor: '#e74c3c', color: 'white', fontSize: '14px', cursor: 'pointer' }}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainPage;
