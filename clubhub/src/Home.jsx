import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGem } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  return (
    <div className="container mt-4">
      <h1 className="display-4 text-primary">Welcome to Your Website 💎</h1>
      <p className="lead">
        🚀 Elevate your experience with Club Hub, the ultimate event organization solution.
      </p>
      <p>
        🌐 Explore a centralized hub for all your club events, competitions, and hackathons.
      </p>
      <p>
        📅 Easily track events with date, venue, and time details at your fingertips.
      </p>
      <p>
        🎉 Enjoy the dynamic Event Carousel for a captivating event preview.
      </p>
      <p>
        <FontAwesomeIcon icon={faGem} className="text-warning" /> Join today and make every event matter!
      </p>
    </div>
  );
};

export default Home;
