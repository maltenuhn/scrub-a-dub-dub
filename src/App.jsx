import { useState, useRef, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Draggable } from "./DraggableRectangle";
import { DraggableColumnControl } from "./ResizableColumn";
import { Picker } from "./Picker";
import { ProcessedColors } from "./Picker";

function App() {
  return (
    <>
      <div>
        {/* <Picker colors={ProcessedColors} /> */}
        <h2>in inspector</h2>
        <Draggable />
        <h2>on canvas</h2>
        <DraggableColumnControl />
      </div>
    </>
  );
}

export default App;
