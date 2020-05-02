import React, { useState, useEffect } from 'react';

const SeasonSelector = ({ show }) => {
  const firstSeason = show.episodes[0].season;
  const lastSeason = show.episodes[show.episodes.length - 1].season;

  const [seasonSelection, setSeasonSelection] = useState(firstSeason);

  const handleSeasonIncrement = () => {
    let season = seasonSelection + 1;
    if (season > lastSeason) {
      season = firstSeason;
    }
    setSeasonSelection(season);
  };

  const handleSeasonDecrement = () => {
    let season = seasonSelection - 1;
    if (season < firstSeason) {
      season = lastSeason;
    }
    setSeasonSelection(season);
  };

  const seasons = {};
  for (let s = firstSeason; s <= lastSeason; s++) {
    const season = show.episodes.filter((ep) => ep.season === s);
    seasons[s] = season;
  }
  console.log(show.name, firstSeason, lastSeason, seasons, seasonSelection);
  return (
    <>
      <div className="season-selector">
        <div className="selector" onClick={() => handleSeasonDecrement()}>
          <i className="fas fa-chevron-left"></i>
        </div>
        <p>{`Season ${seasonSelection}`}</p>
        <div className="selector" onClick={() => handleSeasonIncrement()}>
          <i className="fas fa-chevron-right"></i>
        </div>
      </div>
      <div className="node-wrapper">
        {seasonSelection &&
          seasons[seasonSelection].map((ep) => <div className="node" key={ep.id}></div>)}
      </div>
    </>
  );
};

export default SeasonSelector;
