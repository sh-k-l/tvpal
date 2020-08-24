import React from 'react';

const CalenderItem = ({ episode: { showId, number, showName }, toggleManageShow }) => {
  return (
    <div className="episode" onClick={() => toggleManageShow(showId)}>
      <p className="number">{number}</p>
      <p className="name">{showName}</p>
    </div>
  );
};

export default CalenderItem;
