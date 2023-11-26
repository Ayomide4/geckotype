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
  const [numCorrect, setNumCorrect] = useState(0);
  const [numIncorrect, setNumIncorrect] = useState(0);
  const wpm = useRef(0);
  const [finished, setFinished] = useState(false);
  const totalTyped = useRef(0);
  let totalTime = useRef(0);
  const spanElements = document.querySelectorAll("span");
  const totalChars = spanElements.length - 1;

  // if (input.length === spanElements.length - 1 && spanElements.length !== 0) {
  //   setFinished((prev) => !prev);
  //   setInput("");
  // }

  console.log(spanElements.length, totalChars, input.length);
  console.log("correct", numCorrect, "incorrect", numIncorrect);
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
          setNumCorrect={setNumCorrect}
          numIncorrect={numIncorrect}
          setNumIncorrect={setNumIncorrect}
          totalTyped={totalTyped}
          isFocused={isFocused}
          setFinished={setFinished}
          setIsFocused={setIsFocused}
          numWords={numWords}
        />
      )}
      {finished && (
        <Stats
          setInput={setInput}
          setFinished={setFinished}
          numCorrect={numCorrect}
          setNumCorrect={setNumCorrect}
          totalTyped={totalTyped}
          numIncorrect={numIncorrect}
          setNumIncorrect={setNumIncorrect}
          totalTime={totalTime}
          totalChars={totalChars}
        />
      )}
      <Timer spanElements={spanElements} input={input} totalTime={totalTime} />
      <IoPersonOutline className="profile-icon" />
    </>
  );
}
