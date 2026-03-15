import React, { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
  const cursorDotRef = useRef(null);
  const cursorOutlineRef = useRef(null);
  const requestRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Position state (we update DOM directly via refs for 60fps performance without React re-renders)
  const pos = useRef({ x: 0, y: 0 });
  const outlinePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Hide default cursor early on mount if not touch device
    if (window.matchMedia("(pointer: fine)").matches) {
      document.body.classList.add('hide-default-cursor');
      setIsVisible(true);
    }

    const onMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const updateCursor = () => {
      const dot = cursorDotRef.current;
      const outline = cursorOutlineRef.current;

      if (dot && outline) {
        // Dot follows cursor exactly
        dot.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;

        // Outline trails slightly via linear interpolation (lerp)
        outlinePos.current.x += (pos.current.x - outlinePos.current.x) * 0.15;
        outlinePos.current.y += (pos.current.y - outlinePos.current.y) * 0.15;
        
        outline.style.transform = `translate3d(${outlinePos.current.x}px, ${outlinePos.current.y}px, 0)`;
      }

      requestRef.current = requestAnimationFrame(updateCursor);
    };

    const onMouseOver = (e) => {
      // Check if hovering over clickable elements
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('clickable') ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    
    // Handle cursor leaving the window
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    requestRef.current = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(requestRef.current);
      document.body.classList.remove('hide-default-cursor');
    };
  }, []);

  // Only render on non-touch devices
  if (!window.matchMedia("(pointer: fine)").matches) return null;

  return (
    <>
      <div 
        ref={cursorDotRef}
        className={`custom-cursor-dot ${isVisible ? 'opacity-100' : 'opacity-0'} ${isClicking ? 'scale-75' : 'scale-100'}`}
      />
      <div 
        ref={cursorOutlineRef}
        className={`custom-cursor-outline ${isVisible ? 'opacity-100' : 'opacity-0'} ${
          isHovering ? 'scale-[1.5] bg-cyan-400/20 border-cyan-300' : 'scale-100 border-cyan-400/50'
        } ${isClicking ? 'border-emerald-400' : ''}`}
      />
    </>
  );
};

export default CustomCursor;
