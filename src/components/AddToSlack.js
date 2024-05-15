import React from 'react';
import './AddToSlack.css';

const AddToSlack = () => {
    // Get the Slack client ID from environment variables
    const clientId = process.env.REACT_APP_SLACK_CLIENT_ID;

    // Get the redirect URI from environment variables
    const redirectUri = process.env.REACT_APP_SLACK_REDIRECT_URI;

    // Construct the Slack authorization URL
    const slackUrl = `https://slack.com/oauth/v2/authorize?client_id=${clientId}&scope=commands,chat:write,users:read,im:history&redirect_uri=${redirectUri}`;

    return (
        <div>
            {/* Navigation bar */}
            <nav className="simple-navbar">
                <h1>Approval Bot</h1>
            </nav>
            <div className="add-to-slack-container">
                {/* Approval Bot logo */}
                <img
                    src="/logo-approval.png" 
                    alt="Approval Bot Logo"
                    className="logo"
                />
                <p>Approval Bot takes care of approval requests for you, right inside Slack.</p>
                {/* Add to Slack button */}
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
