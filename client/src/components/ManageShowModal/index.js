import React from 'react';
import { connect } from 'react-redux';
import Modal from '../Modal';
import Season from './Season';
import { handleRemoveShow, handleToggleEpisodes } from '../../actions/shows';

const ManageShowModal = ({ toggleVisibleModal, isOpen, show, removeShow, toggleEpisodes }) => {
  if (show === null) return null;

  const seasons = [];
  for (const season in show.episodes) {
    seasons.push(
      <Season
        showId={show.id}
        season={season}
        episodes={show.episodes[season]}
        toggleEpisodes={toggleEpisodes}
        seenEpisodes={show.seenEpisodes}
        key={season}
      />
    );
  }

  return (
    <Modal toggleVisibleModal={toggleVisibleModal} isOpen={isOpen} direction={'left'}>
      <div className="manage-show">
        <h4>{show.name}</h4>
        <div className="button red remove" onClick={() => removeShow(show.id)}>
          Remove Show
        </div>
        <div className="seasons">{seasons}</div>
      </div>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  const { modals, shows, episodes } = state;
  if (modals.show === null) return { show: null };

  const show = shows.find((show) => show.id === modals.show);
  if (!show) return { show: null };

  const myEpisodes = episodes[show.id].filter((ep) => Date.now() >= new Date(ep.airstamp));

  if (myEpisodes.length !== 0) {
    show.episodes = {};
    const firstSeason = myEpisodes[0].season;
    const lastSeason = myEpisodes[myEpisodes.length - 1].season;

    for (let s = firstSeason; s <= lastSeason; s++) {
      const season = myEpisodes.filter((ep) => ep.season === s);
      show.episodes[s] = season;
    }
  }

  return {
    show: show,
  };
};

const setDispatchToProps = (dispatch) => ({
  removeShow: (showId) => {
    if (window.confirm('Are you sure?')) {
      dispatch(handleRemoveShow(showId));
    }
  },
  toggleEpisodes: (showId, episodeIds, as) =>
    dispatch(handleToggleEpisodes(showId, episodeIds, as)),
});

export default connect(mapStateToProps, setDispatchToProps)(ManageShowModal);
