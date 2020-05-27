import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SummaryItem from './SummaryItem.js';
import NothingToShow from '../NothingToShow';
import { handleToggleModal } from '../../actions/modals';
import { filterOutNotAiredYet } from '../../utils/helpers';

const Summary = ({ shows, toggleManageShow, toggleRankings }) => {
  const [filterText, setFilterText] = useState('');

  if (shows.length === 0) {
    return <NothingToShow />;
  }

  return (
    <div className="summary">
      <div className="header">
        <Link to="/rankings">
          <div className="button">
            <i className="fas fa-sort"></i> Rankings
          </div>
        </Link>
        <input
          type="search"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          placeholder="Filter by show name..."
        />
      </div>

      {shows
        .filter((show) => show.name.toLowerCase().includes(filterText.toLowerCase()))
        .map((show) => (
          <SummaryItem show={show} key={show.id} toggleManageShow={toggleManageShow} />
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

    showEmbedded.episodes = filterOutNotAiredYet(episodes[show.id]);

    output.push(showEmbedded);
  });

  return { shows: output };
};

const mapDispatchToProps = (dispatch) => ({
  toggleManageShow: (showId) => dispatch(handleToggleModal('manage-show', showId)),
  toggleRankings: () => dispatch(handleToggleModal('rankings')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
