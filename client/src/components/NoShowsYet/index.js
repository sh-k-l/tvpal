import React from 'react';

const NoShowsYet = () => {
  return (
    <div className="content-box no-shows-yet">
      <p>
        <span role="img" aria-label="Poop">
          💩
        </span>{' '}
        You've not added any shows yet. Click the <i className="fas fa-plus-square"></i> button
        above to add some now.
      </p>
    </div>
  );
};

export default NoShowsYet;
