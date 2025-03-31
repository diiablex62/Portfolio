import React, { useEffect, useState, useRef, useCallback } from "react";
import "../assets/styles/hero/_cursor.scss";

const DEFAULT_EASING = 0.1;
const NAME_TITLE_MAGNET_DISTANCE = 100;
const NAV_LINK_MAGNET_DISTANCE = 20;
const CONTACT_BUTTON_MAGNET_DISTANCE = 200;
const SCROLL_ARROW_MAGNET_DISTANCE = 200;
const TOP_LEFT_DEAD_ZONE_SIZE = 10;

function Cursor({
  nameTitleRef,
  setIsNameTitleHovered,
  setIsContactButtonHovered,
}) {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
  const dotRef = useRef(null);
  const [currentEasing, setCurrentEasing] = useState(DEFAULT_EASING);
  const [isHovering, setIsHovering] = useState(false);
  const [isNavLinksHovered, setIsNavLinksHovered] = useState(false);
  const [isScrollArrowHovered, setIsScrollArrowHovered] = useState(false);
  const [isScrollArrowDirectlyHovered, setIsScrollArrowDirectlyHovered] =
    useState(false);
  const [isContactButtonDirectlyHovered, setIsContactButtonDirectlyHovered] =
    useState(false);
  const [isNearNameTitle, setIsNearNameTitle] = useState(false);
  const [isNearNavLink, setIsNearNavLink] = useState(false);
  const [isNearContactButton, setIsNearContactButton] = useState(false);
  const [isNearScrollArrow, setIsNearScrollArrow] = useState(false);
  const handleMouseMove = useCallback((event) => {
    setCursorPosition({ x: event.clientX, y: event.clientY });
  }, []);
  const isCursorInDeadZone = useCallback(() => {
    return (
      cursorPosition.x < TOP_LEFT_DEAD_ZONE_SIZE &&
      cursorPosition.y < TOP_LEFT_DEAD_ZONE_SIZE
    );
  }, [cursorPosition]);

  const calculateIsNearNameTitle = useCallback(() => {
    const nameTitleRect = nameTitleRef.current?.getBoundingClientRect();
    if (!nameTitleRect) {
      return false;
    }

    const nameTitleCenterX = nameTitleRect.left + nameTitleRect.width / 2;
    const nameTitleCenterY = nameTitleRect.top + nameTitleRect.height / 2;
    const distance = Math.sqrt(
      Math.pow(cursorPosition.x - nameTitleCenterX, 2) +
        Math.pow(cursorPosition.y - nameTitleCenterY, 2)
    );
    return distance < NAME_TITLE_MAGNET_DISTANCE;
  }, [cursorPosition, nameTitleRef]);

  const calculateIsNearNavLink = useCallback(() => {
    const navLinks = document.querySelectorAll(".nav-link");
    let isNear = false;

    navLinks.forEach((link) => {
      const linkRect = link.getBoundingClientRect();
      const linkCenterX = linkRect.left + linkRect.width / 2;
      const linkCenterY = linkRect.top + linkRect.height / 2;
      const distance = Math.sqrt(
        Math.pow(cursorPosition.x - linkCenterX, 2) +
          Math.pow(cursorPosition.y - linkCenterY, 2)
      );

      if (distance < NAV_LINK_MAGNET_DISTANCE) {
        isNear = true;
      }
    });
    return isNear;
  }, [cursorPosition]);

  const calculateIsNearContactButton = useCallback(() => {
    const contactButtons = document.querySelectorAll(".contact-btn");
    let closestButton = null;
    let minDistance = Infinity;
    let isNear = false;

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
    if (
      closestButton &&
      closestButton.distance < CONTACT_BUTTON_MAGNET_DISTANCE
    ) {
      isNear = true;
    }
    return isNear;
  }, [cursorPosition]);

  const calculateIsNearScrollArrow = useCallback(() => {
    const scrollArrow = document.querySelector(".scroll-arrow");
    if (!scrollArrow) return false;

    const arrowRect = scrollArrow.getBoundingClientRect();
    const arrowCenterX = arrowRect.left + arrowRect.width / 2;
    const arrowCenterY = arrowRect.top + arrowRect.height / 2;
    const distance = Math.sqrt(
      Math.pow(cursorPosition.x - arrowCenterX, 2) +
        Math.pow(cursorPosition.y - arrowCenterY, 2)
    );
    return distance < SCROLL_ARROW_MAGNET_DISTANCE;
  }, [cursorPosition]);

  const calculateIsDirectlyOverScrollArrow = useCallback(() => {
    const scrollArrow = document.querySelector(".scroll-arrow");
    if (!scrollArrow) return false;

    const arrowRect = scrollArrow.getBoundingClientRect();
    return (
      cursorPosition.x >= arrowRect.left &&
      cursorPosition.x <= arrowRect.right &&
      cursorPosition.y >= arrowRect.top &&
      cursorPosition.y <= arrowRect.bottom
    );
  }, [cursorPosition]);

  const calculateIsDirectlyOverContactButton = useCallback(() => {
    const contactButtons = document.querySelectorAll(".contact-btn");
    let isDirectlyOver = false;

    contactButtons.forEach((button) => {
      const buttonRect = button.getBoundingClientRect();
      if (
        cursorPosition.x >= buttonRect.left &&
        cursorPosition.x <= buttonRect.right &&
        cursorPosition.y >= buttonRect.top &&
        cursorPosition.y <= buttonRect.bottom
      ) {
        isDirectlyOver = true;
      }
    });
    return isDirectlyOver;
  }, [cursorPosition]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  useEffect(() => {
    setIsNearNameTitle(calculateIsNearNameTitle());
    setIsNearNavLink(calculateIsNearNavLink());
    setIsNearContactButton(calculateIsNearContactButton());
    setIsNearScrollArrow(calculateIsNearScrollArrow());
    setIsScrollArrowDirectlyHovered(calculateIsDirectlyOverScrollArrow());
    setIsContactButtonDirectlyHovered(calculateIsDirectlyOverContactButton());
  }, [
    cursorPosition,
    calculateIsNearNameTitle,
    calculateIsNearNavLink,
    calculateIsNearContactButton,
    calculateIsNearScrollArrow,
    calculateIsDirectlyOverScrollArrow,
    calculateIsDirectlyOverContactButton,
  ]);

  useEffect(() => {
    setIsNameTitleHovered(isNearNameTitle);
  }, [isNearNameTitle, setIsNameTitleHovered]);

  useEffect(() => {
    setIsContactButtonHovered(isNearContactButton);
  }, [isNearContactButton, setIsContactButtonHovered]);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    let animationFrameId;

    const animate = () => {
      let targetX = cursorPosition.x;
      let targetY = cursorPosition.y;
      let easing = currentEasing;

      if (isCursorInDeadZone()) {
        easing = DEFAULT_EASING;
        setCurrentEasing(DEFAULT_EASING);
      } else if (isNearNameTitle) {
        easing = DEFAULT_EASING;
        setCurrentEasing(DEFAULT_EASING);
      } else if (isNearNavLink) {
        easing = 0.2;
        setCurrentEasing(0.2);
        const navLinks = document.querySelectorAll(".nav-link");
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
      } else if (isNearScrollArrow) {
        easing = 0.1;
        setCurrentEasing(0.1);
        const scrollArrow = document.querySelector(".scroll-arrow");
        if (scrollArrow) {
          const arrowRect = scrollArrow.getBoundingClientRect();
          targetX = arrowRect.left + arrowRect.width / 2;
          targetY = arrowRect.top + arrowRect.height / 2;
        }
      } else {
        const contactButtons = document.querySelectorAll(".contact-btn");
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
        if (
          closestButton &&
          closestButton.distance < CONTACT_BUTTON_MAGNET_DISTANCE
        ) {
          easing = 0.1;
          setCurrentEasing(0.1);
          targetX = closestButton.x;
          targetY = closestButton.y;
        } else {
          easing = DEFAULT_EASING;
          setCurrentEasing(DEFAULT_EASING);
        }
      }

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
    isNearNameTitle,
    nameTitleRef,
    isNearNavLink,
    isNearScrollArrow,
    isCursorInDeadZone,
  ]);

  useEffect(() => {
    const handleMouseEnter = (event) => {
      if (!isCursorInDeadZone()) {
        setIsHovering(true);
      }
    };
    const handleMouseLeave = (event) => {
      if (!isCursorInDeadZone()) {
        setIsHovering(false);
      }
    };

    const navLinks = document.querySelectorAll(".nav-link");
    const contactButtons = document.querySelectorAll(".contact-btn");
    const scrollArrow = document.querySelector(".scroll-arrow");
    const nameTitle = document.querySelector(".name-title");

    const elementsToTrack = [
      ...navLinks,
      ...contactButtons,
      scrollArrow,
    ].filter(Boolean);

    elementsToTrack.forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    });
    if (nameTitle) {
      nameTitle.addEventListener("mouseenter", handleMouseEnter);
      nameTitle.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      elementsToTrack.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
      if (nameTitle) {
        nameTitle.removeEventListener("mouseenter", handleMouseEnter);
        nameTitle.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [isCursorInDeadZone]);

  useEffect(() => {
    console.log("isHovering changed:", isHovering);
  }, [isHovering]);

  useEffect(() => {
    const scrollArrow = document.querySelector(".scroll-arrow");
    if (scrollArrow) {
      if (isNearScrollArrow) {
        scrollArrow.classList.add("white-arrow");
      } else {
        scrollArrow.classList.remove("white-arrow");
      }
    }
  }, [isNearScrollArrow]);
  

  return (
    <div
      className={`custom-cursor ${
        isNearNameTitle ? "name-title-hovered" : ""
      } ${
        isHovering || isNearNavLink || isNearContactButton || isNearScrollArrow
          ? "hovering"
          : ""
      } ${isScrollArrowDirectlyHovered ? "scroll-arrow-direct-hover" : ""} ${
        isContactButtonDirectlyHovered ? "hidden" : ""
      } ${isNearScrollArrow ? "scroll-arrow-magnetized" : ""}`}
      ref={dotRef}
      style={{
        left: `${dotPosition.x}px`,
        top: `${dotPosition.y}px`,
        zIndex: -50,
      }}
    />
  );
}

export default Cursor;
