// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddToSlack from './components/AddToSlack';
import ApprovalHistory from './components/ApprovalHistory';
import './App.css';  

const App = () => {
  return (
    <Router>
      <div className="App">
        <div className="bg"></div>
        <div className="bg bg2"></div>
        <div className="bg bg3"></div>
        <Routes>
          <Route path="/" element={<AddToSlack />} />
          <Route path="/approvalhistory" element={<ApprovalHistory />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
