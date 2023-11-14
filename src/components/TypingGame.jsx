import React from "react";
import { commonWords } from "./CommonWords";
import { useState, useEffect } from "react";

export const TypingGame = ({ input, setInput }) => {
  const [displayPhrase, setDisplayPhrase] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const spanElements = document.querySelectorAll("span");

  const quote = displayPhrase.map((char, index) => {
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
    const arrayValue = e.target.value.split("");
    setInput(e.target.value);

    spanElements.forEach((charSpan, index) => {
      const currentChar = arrayValue[index];
      if (currentChar == null) {
        charSpan.classList.remove("correct");
        charSpan.classList.remove("incorrect");
      } else if (currentChar === charSpan.innerText) {
        charSpan.classList.add("correct");
        charSpan.classList.add("cursor");
        charSpan.classList.remove("incorrect");
      } else {
        charSpan.classList.remove("cursor");
        charSpan.classList.add("incorrect");
        charSpan.classList.remove("correct");
      }
    });
  };

  // count words
  useEffect(() => {
    const arrayValue = input.split("");
    const lastChar = arrayValue[arrayValue.length - 1];
    if (
      lastChar === " " &&
      lastChar === spanElements[arrayValue.length - 1].innerText
    ) {
      setWordCount((prev) => prev + 1);
      setInput("");
    }
  }, [input]);

  const focusInput = () => {
    const input = document.querySelector("input");
    if (input !== null) {
      input.focus();
      setIsFocused(true);
    }
  };

  // focus input on keypress
  if (!isFocused) {
    document.onkeydown = function (e) {
      e = e || window.event;
      focusInput();
    };
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.shiftKey) {
      window.location.reload();
    }
  });

  useEffect(() => {
    generatePhrase();
  }, []);

  return (
    <div>
      <h1>geckotype</h1>
      <div className="game-container ">
        {isFocused && <p className="word-count">{wordCount}/30</p>}
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
          <div className="quote">{quote}</div>
        </div>
      </div>
    </div>
  );
};
