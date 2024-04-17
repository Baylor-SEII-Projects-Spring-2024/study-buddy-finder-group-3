import React, { useEffect, useRef, useState } from 'react';
import styles from "@/styles/custom-cursor.module.css";

const CustomCursor = ({ hover }) => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const moveCursor = (event) => {
      if (cursorRef.current) {
        const x = event.clientX;
        const y = event.clientY + window.scrollY; // consider scroll position
        cursorRef.current.style.transform = `translate3d(${x - 10}px, ${y - 10}px, 0)`;
        cursorRef.current.style.width = hover ? '30px' : '20px';
        cursorRef.current.style.height = hover ? '30px' : '20px';
      }
    };

    document.addEventListener('mousemove', moveCursor);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
    };
  }, [hover]); 

  return <div ref={cursorRef} className={styles.cursor} />;
};

export default CustomCursor;
