import { useState, useRef } from "react";
import React from "react";
import { Typing } from "./Typing";
import { IoPersonOutline } from "react-icons/io5";
import { Timer } from "./Timer";
import { Stats } from "./Stats";
import { Shortcuts } from "./Shortcuts";
import ModeSelect from "./ModeSelect";

export default function TypingGame() {
  const [input, setInput] = useState("");
  const [numWords, setNumWords] = useState(10);
  const [isFocused, setIsFocused] = useState(false);
  const [numCorrect, setNumCorrect] = useState(0);
  const [numIncorrect, setNumIncorrect] = useState(0);
  const [finished, setFinished] = useState(false);
  const totalTyped = useRef(0);
  let id = useRef(null);

  let totalTime = useRef(0);
  const spanElements = document.querySelectorAll("span");
  const totalChars = spanElements.length - 1;
  return (
    <>
      <ModeSelect isFocused={isFocused} setNumWords={setNumWords} />
      <Shortcuts isFocused={isFocused} />
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
          id={id}
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
          setIsFocused={setIsFocused}
        />
      )}
      <Timer
        spanElements={spanElements}
        input={input}
        totalTime={totalTime}
        finished={finished}
        id={id}
      />
      <IoPersonOutline className="profile-icon" />
    </>
  );
}
