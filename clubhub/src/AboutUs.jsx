import React, { useState } from 'react';
import {Tilt} from 'react-tilt';
import './About.css'; // Import your CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faUser } from '@fortawesome/free-solid-svg-icons';

const About = () => {
  const [showAboutUs, setShowAboutUs] = useState(true);

  const toggleCard = () => {
    setShowAboutUs(!showAboutUs);
  };

  return (
    <div className="about-container">
      <Tilt className="tilt-container" options={{ max: 25, scale: 1.05 }}>
        <div className={`glassmorphism-container ${showAboutUs ? 'about-us' : 'about-me'}`}>
          <h1>{showAboutUs ? 'About Us' : 'About Me'} {showAboutUs ? '🚀' : '🧑‍💻'}</h1>
          <p>
            {showAboutUs
              ? 'Club Hub is a collaborative project by ClubHub Team and Devs Club at REC. Simplifying the college journey, enhancing skills, and providing a platform for organizing and tracking various club events.'
              : "A.K.S.THIRUMURUGAN, a 2nd-year student in Robotics and Automation in REC, and a full-stack web, app, and game developer experienced in C,C++,C#,Java.Php,Sql,and Python. Keen interest in development, tech stacks, programming, and automation, particularly in IoT. Achieved runner-up position in a National-level hackathon with the ParkVeu project. Contact me for projects or assistance through the Contact Us page."}
          </p>
          <div className="icon-container">
            <FontAwesomeIcon icon={showAboutUs ? faUsers : faUser} className="icon" />
          </div>
        </div>
      </Tilt>

      <button className="toggle-button" onClick={toggleCard}>
        Toggle
      </button>
    </div>
  );
};

export default About;
