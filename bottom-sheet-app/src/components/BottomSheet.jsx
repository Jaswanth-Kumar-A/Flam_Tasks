import React, { useState, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import './BottomSheet.css';

const HANDLE_HEIGHT = 24; // px
const SHEET_HEIGHT = 600; // px

const snapPoints = {
  closed: HANDLE_HEIGHT, // show just the handle
  half: SHEET_HEIGHT * 0.5,
  open: SHEET_HEIGHT * 0.9,
};

const BottomSheet = ({ children }) => {
  const [isDragging, setIsDragging] = useState(false);

  // Spring animation configuration
  const [{ y }, api] = useSpring(() => ({
    y: snapPoints.open,
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
      const newY = Math.max(snapPoints.closed, Math.min(snapPoints.open, startYValue + deltaY));
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
      api.start({ y: snapPoints[nearest.key] });

      // Clean up listeners
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('touchmove', handleDrag);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchend', handleDragEnd);
    };

    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('touchmove', handleDrag);
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchend', handleDragEnd);
  }, [isDragging, y, api]);

  return (
    <div className="bottom-sheet-container">
      <animated.div
        className="bottom-sheet"
        style={{
          transform: y.to((value) => `translateY(${SHEET_HEIGHT - value}px)`),
        }}
      >
        <div
          className="handle"
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
        />
        <div className="content">
          {children}
        </div>
      </animated.div>
    </div>
  );
};

export default BottomSheet;