import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import NothingToShow from '../NothingToShow';

import { handleReorderShows } from '../../actions/shows';
import { setAlert } from '../../actions/alerts';

import Column from './Column';

const Rankings = ({ shows, username, reorderShows, copyToClipboarAlert }) => {
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

  let shareUrl = window.location.href.split('/');
  shareUrl.splice(shareUrl.length - 1, 1);
  shareUrl.push('u/' + username);
  shareUrl = shareUrl.join('/');

  return (
    <>
      <div className="rankings">
        <div className="header">
          {!username ? (
            <p className="center">
              Add a username <Link to="/settings">here</Link> to share this list!
            </p>
          ) : (
            <CopyToClipboard text={shareUrl}>
              <div className="button" onClick={() => copyToClipboarAlert()}>
                Copy Share Link
              </div>
            </CopyToClipboard>
          )}
          <div className="how-to">
            Drag <div className="handle" /> to reorder
          </div>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const showsInColumn = column.showIds.map((showId) => data.shows[showId]);

            return <Column key={columnId} column={column} shows={showsInColumn} />;
          })}
        </DragDropContext>
      </div>
    </>
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
  copyToClipboarAlert: () => dispatch(setAlert('Copied share link to clipboard! 😊', 'success')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Rankings);
