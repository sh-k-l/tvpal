import React from 'react';
import { GithubLoginButton, GoogleLoginButton } from 'react-social-login-buttons';

const SocialSignIns = () => {
  const hrefPrefix = process.env.NODE_ENV !== 'production' ? 'http://localhost:5000' : '';

  const googleHref = `${hrefPrefix}/api/auth/google`;
  const githubHref = `${hrefPrefix}/api/auth/github`;
  const guestHref = `${hrefPrefix}/api/auth/guest`;

  return (
    <div className="social-sign-ins">
      <a href={googleHref}>
        <GoogleLoginButton />
      </a>
      <a href={githubHref}>
        <GithubLoginButton />
      </a>
      <p className="info">
        <a href={guestHref}>or log in with a guest account</a>
      </p>
    </div>
  );
};

export default SocialSignIns;
