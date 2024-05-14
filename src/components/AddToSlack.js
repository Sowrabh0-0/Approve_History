import React from 'react';

const AddToSlack = () => {
  const clientId = process.env.REACT_APP_SLACK_CLIENT_ID;
  const redirectUri = process.env.REACT_APP_SLACK_REDIRECT_URI;

  console.log('Client ID:', clientId);  // Debugging
  console.log('Redirect URI:', redirectUri);  // Debugging

  const slackUrl = `https://slack.com/oauth/v2/authorize?client_id=${clientId}&scope=commands,chat:write,users:read,im:history&redirect_uri=${redirectUri}`;

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Approval Buddy</h1>
      <p>Approval Buddy takes care of approval requests for you, right inside Slack.</p>
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
  );
};

export default AddToSlack;
