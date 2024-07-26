/** @jsxImportSource @emotion/react */
import { css, Global } from "@emotion/react";

import { useState, useEffect, useRef } from "react";

export const DraggableColumnControl = () => {
  const [position, setPosition] = useState(1);
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
      const incrementX = (movementX / 20) * 4;

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
    <div
      style={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: `100px ${position.toFixed(0)}em 100px`,
        border: "1px solid red",
      }}
    >
      <div
        style={{
          height: 20,
          background: "#f9f9f9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        100px
      </div>
      <div
        css={{
          height: 20,

          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#f9f9f9",
          boxSizing: "border-box",
          "&:hover": {
            background: "#fafafa",
            borderLeft: "1px solid #e8e8e8",
            borderRight: "1px solid #e8e8e8",
          },
        }}
      >
        <div
          data-label="handle left"
          style={{
            width: 10,
            cursor: "ew-resize",
            height: 20,
            transform: "translateX(-5px)",
          }}
        ></div>
        <span>{position.toFixed(0)}em</span>
        <div ref={rectRef}>
          <span
            tabIndex={-1}
            style={{
              border: "1px solid red",
              background: "red",
              position: "relative",
              width: 20,
              height: 20,
              transition: "opacity 0.2s ease-in-out",
              opacity: isDragging ? 1 : 1,
              cursor: `-webkit-image-set(
                url('/cursor-ew-resize.png') 1x,
                url('/cursor-ew-resize@2x.png') 2x
              ) 9 4, ew-resize`,
            }}
            onMouseDown={handleMouseDown}
          >
            {isDragging && (
              <img
                src="/cursor-ew-resize@2x.png"
                width={32}
                alt=""
                style={{
                  position: "absolute",
                  transform: "translateX(-9px) translateY(-0px)",
                }}
                pointer
              />
            )}
          </span>
        </div>
      </div>
      <div
        style={{
          height: 20,
          width: 100,
          background: "#f9f9f9",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        70px
      </div>
    </div>
  );
};
