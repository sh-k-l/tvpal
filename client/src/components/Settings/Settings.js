import React, { useState } from 'react';
import { connect } from 'react-redux';
import { handleLogout, handleAddUsername } from '../../actions/user';

const Settings = ({ user, logout, addUsername }) => {
  const [username, setUsername] = useState('');

  const onClick = () => {
    addUsername(username);
  };

  return (
    <div className="content content-box settings">
      <h5>Account Settings</h5>
      <div className="group">
        <p>Logged in as:</p>{' '}
        <p>
          <b>{user.username ? `${user.name} (${user.username})` : user.name}</b> <i>{user.email}</i>
        </p>
        <div className="button red logout" onClick={logout}>
          Log Out
        </div>
      </div>

      {typeof user.username === 'undefined' ? (
        <div className="group">
          <p>Add a username to your account to allow your friends to find you:</p>
          <div className="username-adder">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={`e.g. "smc45"`}
            />
            <div className="button" onClick={onClick}>
              Add Username
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(handleLogout()),
  addUsername: (username) => dispatch(handleAddUsername(username)),
});

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
