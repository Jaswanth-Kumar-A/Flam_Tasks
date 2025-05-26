import React, { useState, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import './BottomSheet.css';

const BottomSheet = ({ children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [currentPosition, setCurrentPosition] = useState('closed');

  // Define snap points (in pixels from bottom)
  const snapPoints = {
    closed: 0,
    half: window.innerHeight * 0.5,
    open: window.innerHeight * 0.9,
  };

  // Spring animation configuration
  const [{ y }, api] = useSpring(() => ({
    y: snapPoints.closed,
    config: { tension: 300, friction: 30 },
  }));

  const handleDragStart = useCallback((e) => {
    setIsDragging(true);
    const startY = e.touches ? e.touches[0].clientY : e.clientY;
    const startYValue = y.get();

    const handleDrag = (e) => {
      if (!isDragging) return;
      const currentY = e.touches ? e.touches[0].clientY : e.clientY;
      const deltaY = startY - currentY;
      const newY = Math.max(0, Math.min(snapPoints.open, startYValue + deltaY));
      api.start({ y: newY, immediate: true });
    };

    const handleDragEnd = () => {
      setIsDragging(false);
      const currentY = y.get();
      
      // Find nearest snap point
      const distances = Object.entries(snapPoints).map(([key, value]) => ({
        key,
        distance: Math.abs(currentY - value),
      }));
      
      const nearest = distances.reduce((prev, curr) => 
        prev.distance < curr.distance ? prev : curr
      );
      
      setCurrentPosition(nearest.key);
      api.start({ y: snapPoints[nearest.key] });
    };

    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('touchmove', handleDrag);
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchend', handleDragEnd);
  }, [isDragging, y, api]);

  const handleButtonClick = (position) => {
    setCurrentPosition(position);
    api.start({ y: snapPoints[position] });
  };

  return (
    <div className="bottom-sheet-container">
      <animated.div
        className="bottom-sheet"
        style={{
          transform: y.to((value) => `translateY(${value}px)`),
        }}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
      >
        <div className="handle" />
        <div className="content">
          {children}
        </div>
        <div className="controls">
          <button onClick={() => handleButtonClick('closed')}>Close</button>
          <button onClick={() => handleButtonClick('half')}>Half</button>
          <button onClick={() => handleButtonClick('open')}>Open</button>
        </div>
      </animated.div>
    </div>
  );
};

export default BottomSheet; 