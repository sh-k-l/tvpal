import React from 'react';
import { connect } from 'react-redux';

const Backlog = ({ shows }) => {
  console.log(shows);

  return <div>Backlog</div>;
};

const mapStateToProps = (state) => {
  const shows = state;

  return {
    shows: shows,
  };
};

export default connect(mapStateToProps)(Backlog);
