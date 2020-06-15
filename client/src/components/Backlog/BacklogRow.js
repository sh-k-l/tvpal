import React from 'react';
import BacklogItem from './BacklogItem';

const BacklogRow = ({ show, toggleEpisode }) => {
  let tail = 'Loading...';
  let loaded = Array.isArray(show.episodes);

  if (loaded) {
    tail = show.episodes
      .filter((episode, index) => index < 10)
      .map((episode) => (
        <BacklogItem
          episode={episode}
          setSeen={() => toggleEpisode(show.id, episode.id, 'seen')}
          key={episode.id}
        />
      ));
  }

  return (
    <div className="backlog-row content-box">
      <div className="backlog-head">
        <div className="name">{show.name}</div>
        <div className="count">({loaded ? show.episodes.length : '-'})</div>
      </div>
      <div className="backlog-tail">{tail}</div>
    </div>
  );
};

export default BacklogRow;
