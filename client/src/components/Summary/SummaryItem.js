import React from 'react';
import SeasonSelector from './SeasonSelector';

const SummaryItem = ({ show, toggleEpisode }) => {
  return (
    <div className="content-box summary-item">
      <div className="summary-img">
        <img src={show.image} alt={show.name} />
      </div>
      <div className="summary-details">
        <h5>{show.name}</h5>
        <p>{show.status}</p>
      </div>
      <div className="summary-episodes">
        <SeasonSelector show={show} />
      </div>
    </div>
  );
};

export default SummaryItem;
