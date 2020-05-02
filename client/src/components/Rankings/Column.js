import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Show from './Show';

const Column = ({ column, shows }) => {
  return (
    <div className="column-container">
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div className="column" ref={provided.innerRef} {...provided.droppableProps}>
            {shows.map((show, index) => {
              return <Show key={show.id} show={show} index={index} />;
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
