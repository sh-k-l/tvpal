import React, { useState } from 'react';
import MarkAllButtons from './MarkAllButtons';

const Season = ({ showId, season, episodes, seenEpisodes, toggleEpisodes }) => {
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
              onClick={() => toggleEpisodes(showId, [ep.id], isSeen ? 'unseen' : 'seen')}
              key={ep.id}
              onMouseEnter={() => setEpTitle(`${ep.number}) ${ep.name}`)}
              onMouseLeave={() => setEpTitle(null)}
            ></div>
          );
        })}
      </div>
      <MarkAllButtons
        allSeen={() =>
          toggleEpisodes(
            showId,
            episodes.filter((ep) => seenEpisodes.includes(ep.id)).map((ep) => ep.id),
            'unseen'
          )
        }
        allUnseen={() =>
          toggleEpisodes(
            showId,
            episodes.filter((ep) => !seenEpisodes.includes(ep.id)).map((ep) => ep.id),
            'seen'
          )
        }
      />
    </div>
  );
};

export default Season;
