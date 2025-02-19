import React from "react";
import "../css/About.css"; // Assuming you're using an external stylesheet
import image_of_elad from "../assets/about_assets/elad.png"
import image_of_shai from "../assets/about_assets/shai.png";

export default function About() {

  return (
    <div className="about-container">
      <h1>About Us</h1>
      <div className="about-content">
        <div className="profile">
          <img src={image_of_elad} alt="Elad Silam" className="profile-image" />
          <h2>Elad Silam</h2>
          <p>
            Hi, I am Elad Silam. I specialize in Python. I am passionate about
            Algorithms and AI. Together, we aim to achieve better city
            environment for everyone.
          </p>
        </div>
        <div className="profile">
          <img src={image_of_shai } alt="Shai Salem" className="profile-image" />
          <h2>Shai Salem</h2>
          <p>
            Hello, I am Shai Salem. My expertise lies in Java Development and
            Automatic Tests. I enjoy working on QA Team in ACS and via that
            knowledge I am pursuing to make a difference through cities
            management.
          </p>
        </div>
      </div>
    </div>
  );
}
