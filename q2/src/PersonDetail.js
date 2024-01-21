// PersonDetail.js
import React from 'react';
import userIcon from './assets/user.png'; // Import the user icon image

const PersonDetail = ({ person }) => {
  if (!person) return null; // If no person is selected, don't render anything

  return (
    <div className="person-detail">
      <img src={userIcon} alt="User Icon" className="person-detail-image" />
      <div className="person-detail-info">
        <h2 className="person-detail-name">{person.name.first} {person.name.last}</h2>
        <p className="person-detail-email">{person.email}</p>
      </div>
    </div>
  );
};

export default PersonDetail;