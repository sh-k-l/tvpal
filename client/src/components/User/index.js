import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Show from '../Rankings/Show';

const User = ({ match }) => {
  const username = match.params.username;
  const [details, setDetails] = useState(null);
  useEffect(() => {
    axios.get(`/api/users/${username}`).then((res) => {
      setDetails(res.data);
    });
  }, [username]);

  if (!details) return null;

  return (
    <div className="user-ranking">
      <h4>{`${details.name}'s Rankings`}</h4>
      <Link to="/" className="to-home">
        <i className="fas fa-chevron-circle-left"></i> Make your own rankings and manage your TV
        shows now...
      </Link>
      <div className="rankings">
        <div className="column">
          {details.shows.map((show) => (
            <Show show={show} key={show.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default User;
