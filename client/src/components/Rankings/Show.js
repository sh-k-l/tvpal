import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Show = ({ show, index }) => {
  return (
    <Draggable draggableId={show.id + ''} index={index}>
      {(provided, snapshot) => (
        <div
          className="content-box show"
          {...provided.draggableProps}
          ref={provided.innerRef}
          // isDragging={snapshot.isDragging}
        >
          <a
            href={show.imdb ? `https://www.imdb.com/title/${show.imdb}` : null}
            target="_blank"
            rel="noopener noreferrer"
          >
            {show.name}
            {show.country && <span>({show.country})</span>}
          </a>
          <div className="handle" {...provided.dragHandleProps} />
        </div>
      )}
    </Draggable>
  );
};

export default Show;
