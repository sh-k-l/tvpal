import React from 'react';
import { Link } from 'react-scroll';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import GoogleButton from './GoogleButton';

const Welcome = ({ authenticated }) => {
  if (authenticated) return <Redirect to="/backlog" />;

  return (
    <>
      <div className="fill-and-center welcome">
        <h4>
          <span role="img" aria-label="TV">
            📺
          </span>
        </h4>
        <h1>TV Pal</h1>
        <GoogleButton />
        {/* <Link
          activeClass="active"
          className="info"
          to="details"
          spy={true}
          smooth={true}
          duration={500}
        >
          What is TV Pal?
        </Link> */}
      </div>
      {/* <div className="fill-and-center details" name="details">
        <ul>
          <li>Lorem ipsum dolor sit amet consectetur</li>
          <li>Lorem ipsum dolor sit amet consectetur</li>
          <li>Lorem ipsum dolor sit amet consectetur</li>
          <li>Lorem ipsum dolor sit amet consectetur</li>
          <li>Lorem ipsum dolor sit amet consectetur</li>
        </ul>
      </div> */}
    </>
  );
};

const mapStateToProps = (state) => ({
  authenticated: state.user !== null,
});

export default connect(mapStateToProps)(Welcome);
