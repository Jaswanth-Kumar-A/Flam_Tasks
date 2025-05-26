import React, { useCallback } from 'react';
import { useSpring } from 'react-spring';

const handleDragStart = useCallback((e) => {
  e.preventDefault(); // Prevent scrolling while dragging
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

  document.addEventListener('mousemove', handleDrag, { passive: false });
  document.addEventListener('touchmove', handleDrag, { passive: false });
  document.addEventListener('mouseup', handleDragEnd);
  document.addEventListener('touchend', handleDragEnd);
}, [isDragging, y, api]);

export default handleDragStart;
