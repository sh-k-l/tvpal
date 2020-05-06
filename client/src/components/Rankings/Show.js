import React from 'react';

const Show = ({ show, provided }) => {
  if (!provided) {
    return (
      <div className="content-box show">
        <a
          href={show.imdb ? `https://www.imdb.com/title/${show.imdb}` : null}
          target="_blank"
          rel="noopener noreferrer"
        >
          {show.name}
          {show.country && <span>({show.country})</span>}
        </a>
      </div>
    );
  }

  return (
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
  );
};

export default Show;
