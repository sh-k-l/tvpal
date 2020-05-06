import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Show from './Show';

const DraggableShow = ({ show, index }) => {
  return (
    <Draggable draggableId={show.id + ''} index={index}>
      {(provided, snapshot) => <Show provided={provided} show={show} />}
    </Draggable>
  );
};

export default DraggableShow;
