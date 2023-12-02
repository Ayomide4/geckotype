import React, { useRef, useState } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModeSelect from "./ModeSelect";
import { Shortcuts } from "./Shortcuts";
import { Stats } from "./Stats";
import { Timer } from "./Timer";
import { Typing } from "./Typing";

export default function TypingGame() {
  const [input, setInput] = useState("");
  const [numWords, setNumWords] = useState(25);
  const [isFocused, setIsFocused] = useState(false);
  const [numCorrect, setNumCorrect] = useState(0);
  const [numIncorrect, setNumIncorrect] = useState(0);
  const [finished, setFinished] = useState(false);
  const totalTyped = useRef(0);
  let id = useRef(null);

  let totalTime = useRef(0);
  const spanElements = document.querySelectorAll("span");
  const totalChars = spanElements.length - 1;

  const notify = () => toast("This feature is coming soon!");
  return (
    <>
      <ModeSelect
        isFocused={isFocused}
        setNumWords={setNumWords}
        notify={notify}
      />
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
      <IoPersonOutline className="profile-icon" onClick={notify} />
      <ToastContainer />
    </>
  );
}
