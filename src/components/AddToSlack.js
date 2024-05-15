import React from 'react';
import './AddToSlack.css';

const AddToSlack = () => {
  const clientId = process.env.REACT_APP_SLACK_CLIENT_ID;
  const redirectUri = process.env.REACT_APP_SLACK_REDIRECT_URI;

  const slackUrl = `https://slack.com/oauth/v2/authorize?client_id=${clientId}&scope=commands,chat:write,users:read,im:history&redirect_uri=${redirectUri}`;

  return (
    <div>
      <nav className="simple-navbar">
        <h1>Approval Bot</h1>
      </nav>
      <div className="add-to-slack-container">
        <img
          src="/logo-approval.png" 
          alt="Approval Bot Logo"
          className="logo"
        />
        <p>Approval Bot takes care of approval requests for you, right inside Slack.</p>
        <a href={slackUrl}>
          <img
            alt="Add to Slack"
            height="40"
            width="139"
            src="https://platform.slack-edge.com/img/add_to_slack.png"
            srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
          />
        </a>
      </div>
    </div>
  );
};

export default AddToSlack;
