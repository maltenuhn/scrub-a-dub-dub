import { useState, useRef, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Draggable } from "./DraggableRectangle";
import { Picker } from "./Picker";
import { ProcessedColors } from "./Picker";

function App() {
  return (
    <>
      <div>
        {/* <Picker colors={ProcessedColors} /> */}
        <Draggable />
      </div>
    </>
  );
}

export default App;
