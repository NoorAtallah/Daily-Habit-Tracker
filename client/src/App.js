import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import HabitForm from './components/HabitForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/main" element={<MainPage />} />
        <Route path="/add-habit" element={<HabitForm />} />
        <Route path="/edit-habit/:id" element={<HabitForm />} />
      </Routes>
    </Router>
  );
}

export default App;
