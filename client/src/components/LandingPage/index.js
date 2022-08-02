import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <div className="container">
      <span className="welcome-title">WHAT TO COOK TONIGHT</span>
      <span className="welcome-subtitle">Fast, fresh, and foolproof</span>
      <Link to="/home">
        <button className="btn-landing-page">Enter Site</button>
      </Link>
    </div>
  );
}
