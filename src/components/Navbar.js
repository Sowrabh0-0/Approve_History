import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Navbar.css';

const Navbar = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userResponse = await axios.get('http://localhost:3001/api/userinfo');
        setUserInfo(userResponse.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <nav className="navbar">
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
