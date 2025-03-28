import React, { useEffect, useRef } from 'react';
import '../assets/styles/hero/_bouton_contact.scss';

function ContactButton({ contactButtonRef, isContactButtonHovered }) {
  const buttonRef = useRef(null);

  useEffect(() => {
    if (buttonRef.current) {
      if (isContactButtonHovered) {
        buttonRef.current.classList.add('magnetized');
      } else {
        buttonRef.current.classList.remove('magnetized');
      }
    }
  }, [isContactButtonHovered]);

  return (
    <div className="contact-btn-wrapper">
      <button className="contact-btn" ref={(el) => {
        contactButtonRef.current = el;
        buttonRef.current = el;
      }}>
        <span className="contact-text">Contact</span>
        <span className="arrow-wrapper">
          <svg
            className="arrow-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </span>
      </button>
    </div>
  );
}

export default ContactButton;
