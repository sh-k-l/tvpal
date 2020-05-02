import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import { handleReorderShows } from '../../actions/shows';

import Column from './Column';

const Rankings = ({ shows, reorderShows }) => {
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
    <div className="rankings">
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
});

const mapDispatchToProps = (dispatch) => ({
  reorderShows: (from, to) => dispatch(handleReorderShows(from, to)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Rankings);
