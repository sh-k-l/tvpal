import React from 'react';
import { Link } from 'react-scroll';

import GoogleButton from '../GoogleButton';

const Welcome = () => {
  return (
    <>
      <div className="fill-and-center welcome">
        <h4>📺</h4>
        <h1>TV Pal</h1>
        <GoogleButton />
        <Link
          activeClass="active"
          className="info"
          to="details"
          spy={true}
          smooth={true}
          duration={500}
        >
          What is TV Pal?
        </Link>
      </div>
      <div className="fill-and-center details" name="details">
        <ul>
          <li>Lorem ipsum dolor sit amet consectetur</li>
          <li>Lorem ipsum dolor sit amet consectetur</li>
          <li>Lorem ipsum dolor sit amet consectetur</li>
          <li>Lorem ipsum dolor sit amet consectetur</li>
          <li>Lorem ipsum dolor sit amet consectetur</li>
        </ul>
      </div>
    </>
  );
};

export default Welcome;
