import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import NothingToShow from '../NothingToShow/NothingToShow';

import { handleReorderShows } from '../../actions/shows';
import { setAlert } from '../../actions/alerts';

import Column from './Column';
import Header from './RankingsHeader';

const Rankings = ({ shows, username, reorderShows, copyToClipboardAlert }) => {
  if (shows.length === 0) {
    return <NothingToShow />;
  }

  // Format data for react-beautiful-dnd
  const data = {
    shows: shows.reduce(
      (obj, item) => ((obj[item.id + ''] = { ...item, id: item.id + '' }), obj),
      {}
    ),
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'Shows',
        showIds: shows.map((show) => show.id + ''),
      },
    },
    columnOrder: ['column-1'],
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    reorderShows(source.index, destination.index);
  };

  return (
    <div className="content rankings">
      <Header username={username} copyToClipboardAlert={copyToClipboardAlert} />
      <DragDropContext onDragEnd={onDragEnd}>
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId];
          const showsInColumn = column.showIds.map((showId) => data.shows[showId]);

          return <Column key={columnId} column={column} shows={showsInColumn} />;
        })}
      </DragDropContext>
    </div>
  );
};

const mapStateToProps = (state) => ({
  shows: state.shows,
  username:
    state.user.username === null || typeof state.user.username === 'undefined'
      ? false
      : state.user.username,
});

const mapDispatchToProps = (dispatch) => ({
  reorderShows: (from, to) => dispatch(handleReorderShows(from, to)),
  copyToClipboardAlert: () => dispatch(setAlert('Copied share link to clipboard! 😊', 'success')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Rankings);
