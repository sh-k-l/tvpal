import React from 'react';

const SummaryItem = ({ show, toggleManageShow }) => {
  let percentageComplete = 0;

  if (show.status === 'To Be Determined') show.status = 'TBD';

  if (show.episodes) {
    percentageComplete = Math.round((show.seenEpisodes.length / show.episodes.length) * 100, 0);
  }

  return (
    <div className="content-box summary-item">
      <div className="summary-img">
        <img src={show.image} alt={show.name} />
      </div>
      <div className="summary-content">
        <h5 className={show.name.length > 18 ? 'small' : null}>{show.name}</h5>
        <div className="summary-details">
          <div>
            <p className="percentage">{percentageComplete}%</p>
            <p className={`status ${show.status}`}>{show.status}</p>
          </div>
          <div>
            <div className="button" onClick={() => toggleManageShow(show.id)}>
              Manage Show
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryItem;
