import React from 'react';
import { connect } from 'react-redux';
import SummaryItem from './SummaryItem.js';
import { handleToggleEpisode } from '../../actions/shows';

const Summary = ({ shows, toggleEpisode }) => {
  console.log(shows);
  return (
    <div className="summary">
      {shows.map((show) => (
        <SummaryItem show={show} toggleEpisode={toggleEpisode} key={show.id} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { shows, episodes } = state;

  const output = [];

  shows.forEach((show) => {
    const showEmbedded = { ...show };

    // Add null for episodes if we don't have episode data yet
    if (typeof episodes[show.id] === 'undefined' || episodes[show.id] === null) {
      showEmbedded.episodes = null;
      output.push(showEmbedded);
      return;
    }

    showEmbedded.episodes = episodes[show.id];

    output.push(showEmbedded);
  });

  return { shows: output };
};

const mapDispatchToProps = (dispatch) => ({
  toggleEpisode: (showId, episodeId, as) => dispatch(handleToggleEpisode(showId, episodeId, as)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
