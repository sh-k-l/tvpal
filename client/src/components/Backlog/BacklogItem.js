import React from 'react';
import { handleEpisodeNumber, handleDate } from '../../utils/helpers';

const BacklogItem = ({ episode, setSeen }) => {
  const { name, season, number, airstamp } = episode;

  return (
    <div className="backlog-item" onClick={setSeen}>
      <div className="details">
        <div>{handleEpisodeNumber(season, number)}</div>
        <div>{handleDate(airstamp)}</div>
      </div>
      <div className="name">{name.length < 14 ? name : name.slice(0, 14) + '...'}</div>
    </div>
  );
};

export default BacklogItem;
