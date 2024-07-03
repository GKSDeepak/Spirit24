import React from 'react';
import './Leaderboard.css';

const Leaderboard = () => {
    // const leaderboardData = new Array(10).fill({ name: 'NAME HERE', points: 0 });
    const leaderboardData = [
        { name: 'NAME HERE', points: 0 },
        { name: 'NAME HERE', points: 0 },
        { name: 'NAME HERE', points: 0 },
        { name: 'NAME HERE', points: 0 },
        { name: 'NAME HERE', points: 0 },
        { name: 'NAME HERE', points: 0 },
        { name: 'NAME HERE', points: 0 },
        { name: 'NAME HERE', points: 0 },
        { name: 'NAME HERE', points: 0 },
        { name: 'NAME HERE', points: 0 },
        // Add more data entries...
      ];

    return (
        <div className="leaderboard-container">
            <div className="leaderboard-header">LEADERBOARD</div>
            <ul className="leaderboard-list">
                {leaderboardData.map((entry, index) => (
                    <li key={index} className="leaderboard-item">
                        <span className="position">{index + 1}.</span>
                        <span className="name">{entry.name}</span>
                        <span className="points">{entry.points} Points</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Leaderboard;
