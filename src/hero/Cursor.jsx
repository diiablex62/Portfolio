import React, { useEffect, useState, useRef, useCallback } from 'react';
import '../assets/styles/hero/_cursor.scss';

const DEFAULT_EASING = 0.1;
const NAME_TITLE_MAGNET_DISTANCE = 100;
const NAV_LINK_MAGNET_DISTANCE = 20; // Very close distance for nav links
const CONTACT_BUTTON_MAGNET_DISTANCE = 80; // Larger distance for contact button
const TOP_LEFT_DEAD_ZONE_SIZE = 100; // Size of the dead zone (100px x 100px)

function Cursor({ nameTitleRef, setIsNameTitleHovered, setIsContactButtonHovered }) {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
  const dotRef = useRef(null);
  const [currentEasing, setCurrentEasing] = useState(DEFAULT_EASING);
  const [isHovering, setIsHovering] = useState(false);
  const [isNavLinksHovered, setIsNavLinksHovered] = useState(false);

  const handleMouseMove = useCallback((event) => {
    setCursorPosition({ x: event.clientX, y: event.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const isCursorInDeadZone = useCallback(() => {
    return cursorPosition.x < TOP_LEFT_DEAD_ZONE_SIZE && cursorPosition.y < TOP_LEFT_DEAD_ZONE_SIZE;
  }, [cursorPosition]);

  const isCursorNearNameTitle = useCallback(() => {
    const nameTitleRect = nameTitleRef.current?.getBoundingClientRect();
    if (!nameTitleRect) {
      setIsNameTitleHovered(false);
      return false;
    }

    const nameTitleCenterX = nameTitleRect.left + nameTitleRect.width / 2;
    const nameTitleCenterY = nameTitleRect.top + nameTitleRect.height / 2;
    const distance = Math.sqrt(
      Math.pow(cursorPosition.x - nameTitleCenterX, 2) +
        Math.pow(cursorPosition.y - nameTitleCenterY, 2)
    );
    const isNear = distance < NAME_TITLE_MAGNET_DISTANCE;
    setIsNameTitleHovered(isNear);
    return isNear;
  }, [cursorPosition, nameTitleRef, setIsNameTitleHovered]);

  const isCursorNearNavLink = useCallback(() => {
    const navLinks = document.querySelectorAll('.nav-link');
    let isNearNavLink = false;

    navLinks.forEach((link) => {
      const linkRect = link.getBoundingClientRect();
      const linkCenterX = linkRect.left + linkRect.width / 2;
      const linkCenterY = linkRect.top + linkRect.height / 2;
      const distance = Math.sqrt(
        Math.pow(cursorPosition.x - linkCenterX, 2) +
          Math.pow(cursorPosition.y - linkCenterY, 2)
      );

      if (distance < NAV_LINK_MAGNET_DISTANCE) {
        isNearNavLink = true;
      }
    });
    setIsNavLinksHovered(isNearNavLink);
    return isNearNavLink;
  }, [cursorPosition]);

  const isCursorNearContactButton = useCallback(() => {
    const contactButtons = document.querySelectorAll('.contact-btn');
    let closestButton = null;
    let minDistance = Infinity;
    let isNearContactButton = false;

    contactButtons.forEach((button) => {
      const buttonRect = button.getBoundingClientRect();
      const buttonCenterX = buttonRect.left + buttonRect.width / 2;
      const buttonCenterY = buttonRect.top + buttonRect.height / 2;
      const distance = Math.sqrt(
        Math.pow(cursorPosition.x - buttonCenterX, 2) +
          Math.pow(cursorPosition.y - buttonCenterY, 2)
      );

      if (distance < minDistance) {
        minDistance = distance;
        closestButton = { x: buttonCenterX, y: buttonCenterY, distance };
      }
    });
    if (closestButton && closestButton.distance < CONTACT_BUTTON_MAGNET_DISTANCE) {
      isNearContactButton = true;
      console.log("Cursor is near contact button");
    }
    return isNearContactButton;
  }, [cursorPosition]);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    let animationFrameId;

    const animate = () => {
      let targetX = cursorPosition.x;
      let targetY = cursorPosition.y;
      let easing = currentEasing;
      let isNearContactButton = isCursorNearContactButton();

      if (isCursorInDeadZone()) {
        console.log("Cursor is in dead zone");
        easing = DEFAULT_EASING;
        setCurrentEasing(DEFAULT_EASING);
      } else if (isCursorNearNameTitle()) {
        easing = DEFAULT_EASING;
        setCurrentEasing(DEFAULT_EASING);
      } else if (isCursorNearNavLink()) {
        easing = 0.2;
        setCurrentEasing(0.2);
        const navLinks = document.querySelectorAll('.nav-link');
        let closestLink = null;
        let minDistance = Infinity;

        navLinks.forEach((link) => {
          const linkRect = link.getBoundingClientRect();
          const linkCenterX = linkRect.left + linkRect.width / 2;
          const linkCenterY = linkRect.top + linkRect.height / 2;
          const distance = Math.sqrt(
            Math.pow(cursorPosition.x - linkCenterX, 2) +
              Math.pow(cursorPosition.y - linkCenterY, 2)
          );

          if (distance < minDistance) {
            minDistance = distance;
            closestLink = { x: linkCenterX, y: linkCenterY };
          }
        });
        if (closestLink) {
          targetX = closestLink.x;
          targetY = closestLink.y;
        }
      } else {
        const contactButtons = document.querySelectorAll('.contact-btn');
        let closestButton = null;
        let minDistance = Infinity;
        contactButtons.forEach((button) => {
          const buttonRect = button.getBoundingClientRect();
          const buttonCenterX = buttonRect.left + buttonRect.width / 2;
          const buttonCenterY = buttonRect.top + buttonRect.height / 2;
          const distance = Math.sqrt(
            Math.pow(cursorPosition.x - buttonCenterX, 2) +
              Math.pow(cursorPosition.y - buttonCenterY, 2)
          );

          if (distance < minDistance) {
            minDistance = distance;
            closestButton = { x: buttonCenterX, y: buttonCenterY, distance };
          }
        });
        if (closestButton && closestButton.distance < CONTACT_BUTTON_MAGNET_DISTANCE) {
          easing = 0.1;
          setCurrentEasing(0.1);
          targetX = closestButton.x;
          targetY = closestButton.y;
        } else {
          easing = DEFAULT_EASING;
          setCurrentEasing(DEFAULT_EASING);
        }
      }
      setIsContactButtonHovered(isNearContactButton);

      const dx = targetX - dotPosition.x;
      const dy = targetY - dotPosition.y;

      setDotPosition({
        x: dotPosition.x + dx * easing,
        y: dotPosition.y + dy * easing,
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [
    cursorPosition,
    dotPosition,
    isCursorNearNameTitle,
    nameTitleRef,
    isCursorNearNavLink,
  ]);

  useEffect(() => {
    const handleMouseEnter = (event) => {
      console.log("handleMouseEnter called on:", event.target);
      if (!isCursorInDeadZone()) {
        setIsHovering(true);
        console.log("setIsHovering(true) called");
      }
    };
    const handleMouseLeave = (event) => {
      console.log("handleMouseLeave called on:", event.target);
      if (!isCursorInDeadZone()) {
        setIsHovering(false);
        console.log("setIsHovering(false) called");
      }
    };

    const navLinks = document.querySelectorAll('.nav-link');
    const contactButtons = document.querySelectorAll('.contact-btn');
    const scrollArrow = document.querySelector('.scroll-arrow');
    const nameTitle = document.querySelector('.name-title');

    const elementsToTrack = [...navLinks, ...contactButtons, scrollArrow].filter(Boolean);

    elementsToTrack.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });
    if (nameTitle) {
      nameTitle.addEventListener('mouseenter', handleMouseEnter);
      nameTitle.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      elementsToTrack.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
      if (nameTitle) {
        nameTitle.removeEventListener('mouseenter', handleMouseEnter);
        nameTitle.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isCursorInDeadZone]);

  useEffect(() => {
    console.log("isHovering changed:", isHovering);
  }, [isHovering]);

  return (
    <div
      className={`custom-cursor ${isCursorNearNameTitle() ? 'name-title-hovered' : ''} ${isHovering || isNavLinksHovered || isCursorNearContactButton() ? 'hovering' : ''}`}
      ref={dotRef}
      style={{
        left: `${dotPosition.x}px`,
        top: `${dotPosition.y}px`,
        zIndex: 9999,
      }}
    />
  );
}

export default Cursor;
