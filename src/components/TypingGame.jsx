import { useState, useRef } from "react";
import React from "react";
import { Typing } from "./Typing";
import { IoPersonOutline } from "react-icons/io5";
import { Timer } from "./Timer";
import { Stats } from "./Stats";
import ModeSelect from "./ModeSelect";

export default function TypingGame() {
  const [input, setInput] = useState("");
  const [numWords, setNumWords] = useState(50);
  const [isFocused, setIsFocused] = useState(false);
  const wpm = useRef(0);
  const [finished, setFinished] = useState(false);
  const totalTyped = useRef(0);
  const numCorrect = useRef(0);
  const numIncorrect = useRef(0);
  let totalTime = useRef(0);
  const spanElements = document.querySelectorAll("span");
  const totalChars = spanElements.length;

  if (input.length === spanElements.length - 1 && spanElements.length !== 0) {
    setFinished((prev) => !prev);
    setInput("");
  }
  return (
    <>
      <ModeSelect isFocused={isFocused} setNumWords={setNumWords} />
      <div className="title">
        <h1>geckotype</h1>
      </div>
      {!finished && (
        <Typing
          input={input}
          setInput={setInput}
          numCorrect={numCorrect}
          totalTyped={totalTyped}
          numIncorrect={numIncorrect}
          isFocused={isFocused}
          setIsFocused={setIsFocused}
          numWords={numWords}
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
      <IoPersonOutline className="profile-icon" />
    </>
  );
}
