import React from "react";
import { commonWords } from "./CommonWords";
import { useState, useEffect, useCallback } from "react";

//TODO: add a restart game button
//TODO: add a timer
//TODO: add a wpm
//  - wpm = words / minutes
export const TypingGame = () => {
  const [input, setInput] = useState("");
  const [displayPhrase, setDisplayPhrase] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const element = document.querySelectorAll("span");
  const [count, setCount] = useState(0);

  const test2 = displayPhrase.map((char, index) => {
    return <span key={index}>{char}</span>;
  });

  const generatePhrase = () => {
    let arr = [];
    let i = 0;

    while (i < 30) {
      const randomIndex = Math.floor(Math.random() * commonWords.length);
      const randomWord = commonWords[randomIndex];
      const word = randomWord.split("");
      word.push(" ");
      arr = [...arr, ...word];

      i++;
    }
    setDisplayPhrase(arr);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const arrayValue = value.split("");
    setInput(e.target.value);

    element.forEach((charSpan, index) => {
      const currentChar = arrayValue[index];
      if (currentChar == null) {
        charSpan.classList.remove("correct");
        charSpan.classList.remove("incorrect");
      } else if (currentChar === charSpan.innerText) {
        charSpan.classList.add("correct");
        charSpan.classList.remove("incorrect");
      } else {
        charSpan.classList.add("incorrect");
        charSpan.classList.remove("correct");
      }
    });
  };

  const focusInput = () => {
    const input = document.querySelector("input");
    input.focus();
    setIsFocused(true);
  };

  // focus input on keypress
  if (!isFocused) {
    document.onkeydown = function (e) {
      e = e || window.event;
      focusInput();
    };
  } else {
  }

  //FIXME: add a restart game button
  //restart game on shift + enter
  // document.onkeydown = function (e) {
  //   e = e || window.event; if (e.shiftKey && e.code == "Enter") {
  //     window.location.reload();
  //   }
  // };

  useEffect(() => {
    generatePhrase();
  }, [count]);

  return (
    <div>
      <h1>geckotype</h1>
      <div className="game-container ">
        {isFocused && <p className="word-count">0/30</p>}
        {isFocused ? (
          <></>
        ) : (
          <p className="focus-text">Click here or start typing to focus</p>
        )}
        <div
          className={`${isFocused ? "quote" : "quote unfocused"}`}
          onClick={focusInput}
        >
          <input
            className={`${isFocused ? "text-box" : "hidden"}`}
            value={input}
            onChange={(e) => handleChange(e)}
            autoFocus
          />
          <div className="quote">{test2}</div>
        </div>
      </div>
    </div>
  );
};
