import React from 'react';
import GoogleButton from 'react-google-button';

export default () => {
  const href = `http://localhost:5000/auth/google`;

  return (
    <a href={href}>
      <GoogleButton
        onClick={() => {
          console.log('Google button clicked');
        }}
      />
    </a>
  );
};
