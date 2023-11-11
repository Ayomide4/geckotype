import "./App.css";
import { useState, useRef } from "react";
import { TypingGame } from "./components/TypingGame";

function App() {
  const [input, setInput] = useState("");
  const spanElements = document.querySelectorAll("span");

  const timer = useRef(null);
  const getTimerTime = (current) => {
    return Math.floor((new Date() - current) / 1000);
  };
  let totalTime = useRef(0);

  if (input.length === 1) {
    const currentTime = new Date();
    timer.current = setInterval(() => {
      // console.log(getTimerTime(currentTime));
      totalTime.current = getTimerTime(currentTime);
    }, 1000);
  }

  if (input.length === spanElements.length && spanElements.length !== 0) {
    console.log("WPM: ", Math.floor(30 / (totalTime.current / 60)));
    clearInterval(timer.current);
  }

  return (
    <>
      <TypingGame
        spanElements={spanElements}
        input={input}
        setInput={setInput}
      />
    </>
  );
}

export default App;
