import React from 'react';
import BacklogItem from './BacklogItem';

const BacklogRow = ({ show, toggleEpisode }) => {
  let tail = null;
  if (Array.isArray(show.episodes)) {
    tail = show.episodes.map((episode, index) => {
      if (index < 10) {
        return (
          <BacklogItem
            episode={episode}
            setSeen={() => toggleEpisode(show.id, episode.id, 'seen')}
            key={episode.id}
          />
        );
      }
    });
  } else {
    tail = <p>Loading...</p>;
  }

  return (
    <div className="backlog-row content-box">
      <div className="backlog-head">{show.name}</div>
      <div className="backlog-tail">{tail}</div>
    </div>
  );
};

export default BacklogRow;
