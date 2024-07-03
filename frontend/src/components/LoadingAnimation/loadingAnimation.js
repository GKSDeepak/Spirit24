// LoadingAnimation.js
import React from 'react';
import './loadingAnimation.css'; // Import CSS for styling

const LoadingAnimation = ({ isLoading }) => {
  return (
    <div className={`loading-overlay ${isLoading ? 'visible' : ''}`}>
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingAnimation;
