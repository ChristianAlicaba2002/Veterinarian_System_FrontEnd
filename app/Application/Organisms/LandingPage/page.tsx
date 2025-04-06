import React from 'react'
import "./LandingStyles/Landing.css"

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="landing-card">
        <h1 className="landing-title">Landing Page</h1>
        <div className="landing-links">
          <a href="Application/Organisms/Auth/LoginPage" className="landing-link sign-in">Sign in</a>
          <a href="Application/Organisms/Auth/RegisterPage" className="landing-link sign-up">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default LandingPage
