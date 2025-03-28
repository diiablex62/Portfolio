import React, { useRef, useState } from 'react';
import Cursor from './hero/Cursor';
import Navigation from './hero/Navigation';
import Hero from './hero/Hero';
import { NavLinksRefsProvider } from './hero/NavLinksRefsContext';

function App() {
  const scrollArrowRef = useRef(null);
  const navLinksRef = useRef([]);
  const contactButtonRef = useRef(null);
  const nameTitleRef = useRef(null);
  const [isNameTitleHovered, setIsNameTitleHovered] = useState(false);
  const [isContactButtonHovered, setIsContactButtonHovered] = useState(false);

  return (
    <NavLinksRefsProvider navLinksRef={navLinksRef}>
      <div>
        <Navigation
          contactButtonRef={contactButtonRef}
          isContactButtonHovered={isContactButtonHovered}
          setIsContactButtonHovered={setIsContactButtonHovered}
        />
        <Hero
          scrollArrowRef={scrollArrowRef}
          nameTitleRef={nameTitleRef}
          isNameTitleHovered={isNameTitleHovered}
        />
        <Cursor
          nameTitleRef={nameTitleRef}
          setIsNameTitleHovered={setIsNameTitleHovered}
          setIsContactButtonHovered={setIsContactButtonHovered}
        />
      </div>
    </NavLinksRefsProvider>
  );
}

export default App;
