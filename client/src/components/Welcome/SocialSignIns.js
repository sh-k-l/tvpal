import React from 'react';
import { GithubLoginButton, GoogleLoginButton } from 'react-social-login-buttons';

const SocialSignIns = () => {
  const hrefPrefix = process.env.NODE_ENV !== 'production' ? 'http://localhost:5000' : '';

  const googleHref = `${hrefPrefix}/api/auth/google`;
  const githubHref = `${hrefPrefix}/api/auth/github`;

  return (
    <div className="social-sign-ins">
      <a href={googleHref}>
        <GoogleLoginButton />
      </a>
      <a href={githubHref}>
        <GithubLoginButton />
      </a>
    </div>
  );
};

export default SocialSignIns;
