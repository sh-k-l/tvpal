import React from 'react';
import { connect } from 'react-redux';

import ShowListItem from './ShowListItem';

import { handleAddShow } from '../../actions/shows';

const ShowList = ({ shows, rankings, addShow }) => {
  if (shows === null) return null;

  return (
    <ul>
      {shows
        .map((show) => show.show)
        .map((show) => {
          const index = rankings.findIndex((w) => {
            return w.id === show.id;
          });

          return (
            <ShowListItem
              show={show}
              alreadyAdded={index !== -1}
              addShowHandler={addShow}
              key={show.id}
            />
          );
        })}
    </ul>
  );
};

const mapStateToProps = (state) => ({
  rankings: state.shows,
});

const mapDispatchToProps = (dispatch) => ({
  addShow: (show) => dispatch(handleAddShow(show)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowList);
