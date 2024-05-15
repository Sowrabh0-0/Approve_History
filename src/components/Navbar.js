import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Navbar.css';

const Navbar = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userResponse = await axios.get('https://slack-bot-backend-livid.vercel.app/api/userinfo');
        setUserInfo(userResponse.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="/logo-approval.png" alt="Approval Bot Logo" /> {/* Ensure the correct filename and extension */}
      </div>
      {userInfo && (
        <div className="profile">
          <img src={userInfo.avatar || 'https://via.placeholder.com/32'} alt="User Avatar" />
          <div className="profile-info">
            <span className="workspace">{userInfo.workspace}</span>
            <span className="email">{userInfo.real_name || userInfo.email}</span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
