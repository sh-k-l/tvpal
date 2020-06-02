import React from 'react';
import { connect } from 'react-redux';
import BacklogRow from './BacklogRow';
import NothingToShow from '../NothingToShow/NothingToShow';
import { handleToggleEpisodes } from '../../actions/shows';

const Backlog = ({ shows, toggleEpisode }) => {
  if (shows === null) {
    return null;
  }
  if (shows.length === 0) {
    return <NothingToShow />;
  }
  return (
    <div className="content backlog">
      {shows.map((show) => (
        <BacklogRow show={show} toggleEpisode={toggleEpisode} key={show.id} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  const { shows, episodes } = state;

  if (shows === null) {
    return {
      shows: null,
    };
  }

  const output = [];

  shows.forEach((show) => {
    const showEmbedded = { ...show };

    // Add null for episodes if we don't have episode data yet
    if (typeof episodes[show.id] === 'undefined' || episodes[show.id] === null) {
      showEmbedded.episodes = null;
      output.push(showEmbedded);
      return;
    }

    // Check episodes against seen episodes
    showEmbedded.episodes = episodes[show.id].filter((ep) => {
      return (
        ep.airstamp && !show.seenEpisodes.includes(ep.id) && Date.now() >= new Date(ep.airstamp)
      );
    });

    // Don't need shows without any outstanding episodes
    if (showEmbedded.episodes.length === 0) return;

    output.push(showEmbedded);
  });

  return { shows: output };
};

const mapDispatchToProps = (dispatch) => ({
  toggleEpisode: (showId, episodeId, as) => dispatch(handleToggleEpisodes(showId, [episodeId], as)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Backlog);
