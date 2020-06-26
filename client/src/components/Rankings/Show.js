import React from 'react';

const Show = ({ show, provided }) => {
  let showProps = {};
  let handle = null;

  if (provided) {
    showProps = {
      ...provided.draggableProps,
      ref: provided.innerRef,
      // isDragging: {snapshot.isDragging}
    };

    handle = <div className="handle" {...provided.dragHandleProps} />;
  }

  return (
    <div className="content-box show" {...showProps}>
      <a
        href={show.imdb ? `https://www.imdb.com/title/${show.imdb}` : null}
        target="_blank"
        rel="noopener noreferrer"
      >
        {show.name}
        {show.country && <span>({show.country})</span>}
      </a>
      {handle}
    </div>
  );
};

export default Show;
