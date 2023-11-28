import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './ImageCarousel.css'; // Import your custom styles

const ImageCarousel = () => {
  const events = useSelector((state) => state.events.events);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === events.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? events.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    let intervalId;

    if (!isHovered) {
      intervalId = setInterval(handleNextImage, 2000); // Slide every 5 seconds
    }

    return () => clearInterval(intervalId);
  }, [currentImageIndex, isHovered]);

  return (
    <div className="image-carousel">
      <div
        className={`carousel-container ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h2>{events[currentImageIndex]?.en}</h2>
        <img
          src={events[currentImageIndex]?.em}
          alt={`Event ${currentImageIndex + 1}`}
          className={`carousel-image ${isHovered ? 'zoomed' : ''}`}
        />
<div className="buttons-container">
  <button onClick={handlePrevImage} className="btn btn-dark btn-sm">
    Previous
  </button>
  <button onClick={handleNextImage} className="btn btn-dark btn-sm">
    Next
  </button>
</div>

      </div>
    </div>
  );
};

export default ImageCarousel;
