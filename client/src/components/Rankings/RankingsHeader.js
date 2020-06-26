import React from 'react';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const RankingsHeader = ({ username, copyToClipboardAlert }) => {
  let shareUrl = window.location.href.split('/');
  shareUrl.splice(shareUrl.length - 1, 1);
  shareUrl.push('u/' + username);
  shareUrl = shareUrl.join('/');

  return (
    <div className="header">
      <div className="left">
        <Link to="/summary">
          <div className="button">
            <i className="fas fa-caret-left"></i> Back
          </div>
        </Link>

        {!username ? (
          <p className="center">
            Add a username <Link to="/settings">here</Link> to share this list!
          </p>
        ) : (
          <CopyToClipboard text={shareUrl}>
            <div className="button" onClick={() => copyToClipboardAlert()}>
              Copy Share Link
            </div>
          </CopyToClipboard>
        )}
      </div>
      <div className="how-to">
        Drag <div className="handle" /> to reorder
      </div>
    </div>
  );
};

export default RankingsHeader;
