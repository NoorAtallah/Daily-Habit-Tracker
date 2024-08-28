import React from 'react';

const HabitCard = ({ habit }) => {
  return (
    <div>
      <h3>{habit.name}</h3>
      <p>{habit.description}</p>
    </div>
  );
};

export default HabitCard;
