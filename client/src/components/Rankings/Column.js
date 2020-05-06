import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import DraggableShow from './DraggableShow';

const Column = ({ column, shows }) => {
  return (
    <div className="column-container">
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div className="column" ref={provided.innerRef} {...provided.droppableProps}>
            {shows.map((show, index) => {
              return <DraggableShow key={show.id} show={show} index={index} />;
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
