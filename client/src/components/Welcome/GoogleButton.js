import React from 'react';
import GoogleButton from 'react-google-button';

export default () => {
  const hrefPrefix = process.env.NODE_ENV !== 'production' ? 'http://localhost:5000' : '';
  const href = `${hrefPrefix}/auth/google`;

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
