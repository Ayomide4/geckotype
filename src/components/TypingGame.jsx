import { useState, useRef } from "react";
import { Typing } from "./Typing";
import { Timer } from "./Timer";
import { Stats } from "./Stats";

export default function TypingGame() {
  const [input, setInput] = useState("");
  const wpm = useRef(0);
  const [finished, setFinished] = useState(false);
  const [numIncorrect, setNumIncorrect] = useState(0);
  const spanElements = document.querySelectorAll("span");

  if (input.length === spanElements.length && spanElements.length !== 0) {
    setFinished((prev) => !prev);
    setInput("");
  }
  return (
    <>
      {!finished && (
        <Typing
          input={input}
          setInput={setInput}
          setNumIncorrect={setNumIncorrect}
        />
      )}
      {finished && (
        <Stats
          setFinished={setFinished}
          wpm={wpm}
          numIncorrect={numIncorrect}
        />
      )}
      <Timer spanElements={spanElements} input={input} wpm={wpm} />
    </>
  );
}
