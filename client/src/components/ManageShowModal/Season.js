import React, { useState } from 'react';

const Season = ({ showId, season, episodes, seenEpisodes, toggleEpisode }) => {
  const [epTitle, setEpTitle] = useState(null);

  return (
    <div className="season">
      <h5>{epTitle ? epTitle : `Season ${season}`}</h5>
      <div className="node-wrapper">
        {episodes.map((ep) => {
          const isSeen = seenEpisodes.includes(ep.id);
          return (
            <div
              className={isSeen ? 'node seen' : 'node'}
              onClick={() => toggleEpisode(showId, ep.id, isSeen ? 'unseen' : 'seen')}
              key={ep.id}
              onMouseEnter={() => setEpTitle(`${ep.number}: ${ep.name}`)}
              onMouseLeave={() => setEpTitle(null)}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default Season;
