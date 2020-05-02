import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = ({ toggleShowAdder }) => {
  return (
    <div className="menu-container">
      <ul>
        <li>
          <NavLink to="/summary" activeClassName="selected">
            Summary
          </NavLink>
        </li>
        <li>
          <NavLink to="/backlog" activeClassName="selected">
            Backlog
          </NavLink>
        </li>
        <li>
          <NavLink to="/calendar" activeClassName="selected">
            Calendar
          </NavLink>
        </li>
        <li>
          <NavLink to="/rankings" activeClassName="selected">
            Rankings
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" activeClassName="selected">
            {/* Settings */}
            <i className="fas fa-cog"></i>
          </NavLink>
        </li>
      </ul>
      <div className="toggle-show-adder" onClick={toggleShowAdder}>
        <i className="fas fa-plus-square"></i>
      </div>
    </div>
  );
};

export default Menu;
