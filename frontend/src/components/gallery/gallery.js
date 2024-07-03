import React, { useEffect, useState, useRef } from 'react';
import './gallery.css';

const Gallery = () => {
  const images = [
    "img_1.jpg",
    "img_2.jpg",
    "img_3.jpg",
    "img_4.jpg",
    "img_5.jpg",
    "img_6.jpg",
    "img_7.jpg",
    "img_1.jpg",
    "img_2.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState('right');
  const totalImages = images.length;

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => {
          if (direction === 'right') {
            return prevIndex + 1;
          } else {
            return prevIndex - 1;
          }
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isHovered, direction]);

  useEffect(() => {
    if (currentIndex >= totalImages - 1) {
      setTimeout(() => {
        setDirection('left');
      }, 50);
    } else if (currentIndex <= 0 && direction === 'left') {
      setTimeout(() => {
        setDirection('right');
      }, 50);
    }
  }, [currentIndex, totalImages, direction]);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  return (
    <div className="gallery-container" id="gallery">
      <h1>Gallery</h1>
      <div className="carousel">
        <div
          className={`carousel-track ${isTransitioning ? 'transition' : ''} active-${currentIndex % totalImages}`}
        >
          {images.concat(images).map((image, index) => (
            <div className="card" key={index}>
              <img className="galleryimg" src={image} alt={`Image ${index}`} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
