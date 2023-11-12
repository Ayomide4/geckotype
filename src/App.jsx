import "./App.css";
import { useState, useRef } from "react";
import { TypingGame } from "./components/TypingGame";
import { Timer } from "./components/Timer";
import { Stats } from "./components/Stats";

function App() {
  const [input, setInput] = useState("");
  const wpm = useRef(0);
  const [acc, setAcc] = useState(0);
  const [finished, setFinished] = useState(false);
  const spanElements = document.querySelectorAll("span");
  if (input.length === spanElements.length && spanElements.length !== 0) {
    setFinished((prev) => !prev);
    setInput("");
  }
  return (
    <>
      {!finished && <TypingGame input={input} setInput={setInput} />}
      {finished && <Stats setFinished={setFinished} wpm={wpm} />}
      <Timer spanElements={spanElements} input={input} wpm={wpm} />
    </>
  );
}

export default App;
