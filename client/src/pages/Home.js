import React from "react";
import LoginForm from "./LoginForm";

const Home = () => {
  return (
    <div className="home-container">
      <div className="articles-section">
        <h2>Passport-Jwt-Authentication</h2>
        <div className="article">
          <h3>Introduction to React</h3>
          <p>
            React is a powerful JavaScript library for building user interfaces.
            It allows developers to create reusable UI components and manage
            application state efficiently, making complex web applications more
            manageable and performant.
          </p>
        </div>

        <div className="article">
          <h3>Web Development Trends</h3>
          <p>
            Modern web development continues to evolve rapidly. Key trends
            include serverless architectures, progressive web apps, and
            increased focus on performance optimization and user experience
            across different devices and platforms.
          </p>
        </div>
      </div>

      <div className="login-section">
        <LoginForm />
      </div>
    </div>
  );
};

export default Home;
