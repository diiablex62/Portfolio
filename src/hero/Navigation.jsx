import React, { useState } from 'react';
import '../assets/styles/hero/_hero.scss';
import '../assets/styles/hero/_navigation.scss';
import ContactButton from './ContactButton';
import { useNavLinksRefs } from './NavLinksRefsContext';

function Navigation({ contactButtonRef, isContactButtonHovered, setIsContactButtonHovered }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinksRef = useNavLinksRefs();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const links = ['Accueil', 'À propos de moi', 'Mes projets', 'Contact'];

  return (
    <nav className={`portfolio-navigation ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="nav-links">
        <div className="hamburger-menu" onClick={toggleMenu}>
          <div className="bar" />
          <div className="bar" />
          <div className="bar" />
        </div>
        <div className={`nav-links-list ${isMenuOpen ? 'open' : ''}`}>
          {links.map((link, index) => (
            <a
              key={link.toLowerCase()}
              href={`#${link.toLowerCase().replace('à ', 'a-').replace('é', 'e')}`}
              className="nav-link"
              ref={(el) => {
                if (el) {
                  navLinksRef.current[index] = el;
                }
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              <span>{link}</span>
            </a>
          ))}
          <div className="mobile-contact-btn">
            <ContactButton
              contactButtonRef={contactButtonRef}
              isContactButtonHovered={isContactButtonHovered}
            />
          </div>
        </div>
      </div>
      <div className="desktop-contact-btn">
        <ContactButton
          contactButtonRef={contactButtonRef}
          isContactButtonHovered={isContactButtonHovered}
        />
      </div>
    </nav>
  );
}

export default Navigation;
