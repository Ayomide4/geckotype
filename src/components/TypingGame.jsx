import { useState, useRef } from "react";
import { Typing } from "./Typing";
import { Timer } from "./Timer";
import { Stats } from "./Stats";

export default function TypingGame() {
  const [input, setInput] = useState("");
  const wpm = useRef(0);
  const [finished, setFinished] = useState(false);
  const totalTyped = useRef(0);
  const numCorrect = useRef(0);
  const numIncorrect = useRef(0);
  let totalTime = useRef(0);
  const spanElements = document.querySelectorAll("span");
  const totalChars = spanElements.length;

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
          numCorrect={numCorrect}
          totalTyped={totalTyped}
          numIncorrect={numIncorrect}
        />
      )}
      {finished && (
        <Stats
          setFinished={setFinished}
          numCorrect={numCorrect}
          totalTyped={totalTyped}
          numIncorrect={numIncorrect}
          totalTime={totalTime}
          totalChars={totalChars}
        />
      )}
      <Timer spanElements={spanElements} input={input} totalTime={totalTime} />
    </>
  );
}
