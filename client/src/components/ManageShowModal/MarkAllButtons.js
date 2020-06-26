import React from 'react';

const MarkAllButtons = ({ allSeen, allUnseen }) => {
  return (
    <div className="mark-wrapper">
      <div className="button" onClick={allSeen}>
        Mark All <i className="fas fa-times"></i>
      </div>
      <div className="button" onClick={allUnseen}>
        Mark All <i className="fas fa-check"></i>
      </div>
    </div>
  );
};

export default MarkAllButtons;
