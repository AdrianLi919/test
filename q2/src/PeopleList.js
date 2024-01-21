// PeopleList.js
import React from 'react';
import userIcon from './assets/user.png'; // Import the user icon image

const PeopleList = ({ people, onSelectPerson }) => {
  return (
    <div className="people-list-container">
      {people.map(person => (
        <div key={person._id} className="list-item" onClick={() => onSelectPerson(person)}>
          <img src={userIcon} alt="User Icon" className="person-image" height={36} />
          <div className="person-name">{person.name.first} {person.name.last}</div>
        </div>
      ))}
    </div>
  );
};

export default PeopleList;
