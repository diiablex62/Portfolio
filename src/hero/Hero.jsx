import React, { useEffect, useRef } from 'react';
import '../assets/styles/hero/_hero.scss';
import img1 from '../assets/img/alex_carre.jpg';
import img2 from '../assets/img/pc.png';
import img3 from '../assets/img/bounty_carre.jpg'; // Import the third image

function Hero({ scrollArrowRef, nameTitleRef, isNameTitleHovered }) { // Add isNameTitleHovered as a prop
  const heroContentRef = useRef(null);

  useEffect(() => {
    if (scrollArrowRef.current) {
      scrollArrowRef.current.closest('.scroll-down').style.pointerEvents = 'none';
    }
  }, [scrollArrowRef]);

  const handleScrollToNextSection = () => {
  };

  return (
    <>
      <div className={`hero-images left ${isNameTitleHovered ? 'visible' : ''}`}>
        <img src={img1} alt="Image 1" className="hero-image hero-image-1" />
      </div>
      <div className={`hero-images bottom-left ${isNameTitleHovered ? 'visible' : ''}`}>
        <img src={img2} alt="Image 2" className="hero-image hero-image-2" />
      </div>
      <div className={`hero-images center-right ${isNameTitleHovered ? 'visible' : ''}`}> {/* New div for the third image */}
        <img src={img3} alt="Image 3" className="hero-image hero-image-3" /> {/* Third image */}
      </div>
      <section className="hero-section">
        <div className="hero-content" ref={heroContentRef}>
          <span
            className="name-title"
            ref={nameTitleRef} // Assign the ref here
          >
            Alexandre
          </span>
          <span className="welcome-text">Développeur web</span>
        </div>
        <div className="scroll-down" onClick={handleScrollToNextSection}>
          <div className="scroll-arrow scroll-arrow-magnet" ref={scrollArrowRef} />
        </div>
      </section>
    </>
  );
}

export default Hero;
