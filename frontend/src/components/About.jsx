import React from "react";
import Navbar from "./Navbar";
import "./About.css";

const About = () => {
  return (
    <div>
      <Navbar />
      <div className="about-container">
        <h1 className="website-title">Webcode: Online Judge</h1>
        <h2>About</h2>
        <p>
          Webcode is an application for coding Geeks to try out new problems and
          keep track of who solves what. It is a portal for users to test their
          mettle on various coding problems, some of which may require users to
          revisit their very basics.The design of Webcode is clean and
          card-based, with a focus on user-interaction above everything else.
        </p>

        <blockquote>
          "If coding isn't beautiful, I don't know what is."
        </blockquote>
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature-box">
            <h3>Extensive Problem Set</h3>
            <p>Covering various difficulty levels.</p>
          </div>
          <div className="feature-box">
            <h3>Real-Time Code Execution</h3>
            <p>Compile and run your code instantly.</p>
          </div>
          <div className="feature-box">
            <h3>Leaderboard</h3>
            <p>Track top performers and compete.</p>
          </div>
          <div className="feature-box">
            <h3>User-Friendly Code Editor</h3>
            <p>Integrated with syntax highlighting.</p>
          </div>
          <div className="feature-box">
            <h3>Detailed Problem Descriptions</h3>
            <p>With sample test cases.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
