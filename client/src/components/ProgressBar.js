import React from 'react';

const ProgressBar = ({ progress }) => {
  const completionRate = (progress.filter(p => p.completed).length / progress.length) * 100;

  return (
    <div style={{ width: '100%', backgroundColor: '#ccc' }}>
      <div style={{ width: `${completionRate}%`, backgroundColor: '#4caf50', height: '24px' }} />
    </div>
  );
};

export default ProgressBar;
