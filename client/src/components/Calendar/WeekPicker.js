import React from 'react';

const WeekPicker = ({ startDate, week, weekDecrement, weekIncrement }) => {
  return (
    <div className="week-picker">
      {' '}
      <div className="selector" onClick={weekDecrement}>
        <i className="fas fa-chevron-left"></i>
      </div>
      <p>
        Week of{' '}
        <b>
          {startDate
            .clone()
            .add(week * 7, 'day')
            .format('MMMM Do')}
        </b>
      </p>
      <div className="selector" onClick={weekIncrement}>
        <i className="fas fa-chevron-right"></i>
      </div>
    </div>
  );
};

export default WeekPicker;
