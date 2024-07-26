/** @jsxImportSource @emotion/react */
import { css, Global } from "@emotion/react";

import { useState, useEffect, useRef } from "react";

export const Draggable = () => {
  const [position, setPosition] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const rectRef = useRef(null);
  const fakePointerRef = useRef(null);

  const handleMouseDown = (event) => {
    // Request pointer lock
    if (rectRef.current) {
      rectRef.current.requestPointerLock();
    }
    setIsDragging(true);
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!isDragging) return;

      // Calculate the movement in pixels
      const movementX = event.movementX;

      // Increment the position by 0.5px for every 5 screen pixels
      const incrementX = (movementX / 5) * 4;
      setPosition((prevPosition) => prevPosition + incrementX);

      // Update the fake mouse pointer position
      setMousePosition((prevPosition) => {
        let newX = prevPosition.x + movementX;
        let newY = prevPosition.y;

        // Wrap around logic
        if (newX < 0) newX = window.innerWidth;
        if (newX > window.innerWidth) newX = 0;
        if (newY < 0) newY = window.innerHeight;
        if (newY > window.innerHeight) newY = 0;

        return { x: newX, y: newY };
      });
    };

    const handleMouseUp = () => {
      // Release pointer lock
      if (document.pointerLockElement === rectRef.current) {
        document.exitPointerLock();
      }
      setIsDragging(false);
    };

    const handlePointerLockChange = () => {
      if (document.pointerLockElement === rectRef.current) {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
      } else {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      }
    };

    document.addEventListener("pointerlockchange", handlePointerLockChange);

    return () => {
      document.removeEventListener(
        "pointerlockchange",
        handlePointerLockChange
      );
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={rectRef}
        css={{
          width: "100px",
          height: "100px",

          borderRadius: 4,
          padding: "4px 8px",
          height: 23,
          alignContent: "center",
          color: "black",
          fontFamily: "Inter",
          fontSize: 11,
          fontWeight: 500,
          display: "grid",
          gridTemplateColumns: "20px 1fr",
          overflow: "hidden",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.05)",
          },
          "&:focus-within": {
            boxShadow: "0px 0px 0px 1px #419cff",
          },
        }}
      >
        <span
          tabIndex={-1}
          style={{
            transition: "opacity 0.2s ease-in-out",
            opacity: isDragging ? 1 : 0.3,
            cursor: `-webkit-image-set(
                url('/cursor-ew-resize.png') 1x,
                url('/cursor-ew-resize@2x.png') 2x
              ) 9 4, ew-resize`,
          }}
          onMouseDown={handleMouseDown}
        >
          <img src="/paddingHorizontal-black-16x16@2x.png" width={16} />
        </span>
        <span>{position.toFixed(0)}</span>
      </div>
      {isDragging && (
        <div
          ref={fakePointerRef}
          style={{
            position: "fixed",
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            width: "10px",
            height: "10px",
            pointerEvents: "none",
          }}
        >
          <img
            src="/cursor-ew-resize@2x.png"
            width={32}
            alt=""
            style={{ transform: "translateX(-9px) translateY(-4px)" }}
            pointer
          />
        </div>
      )}
    </div>
  );
};
