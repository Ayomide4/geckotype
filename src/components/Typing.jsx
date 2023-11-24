import React from "react";
import { FaRedoAlt } from "react-icons/fa";
import { easyWords } from "./CommonWords";
import { useState, useEffect, useRef } from "react";
//TODO: fix cursor blinking css on current char
//TODO: look at monkeytype to figure out stuff
//refactor

export const Typing = ({
  input,
  setInput,
  numCorrect,
  totalTyped,
  isFocused,
  setIsFocused,
  numIncorrect,
}) => {
  const [displayPhrase, setDisplayPhrase] = useState([]);
  const [wordCount, setWordCount] = useState(0);
  const spanElements = document.querySelectorAll("span");
  const wordIndex = useRef(0);

  const quote = displayPhrase.map((char, index) => {
    return <span key={index}>{char}</span>;
  });

  const generatePhrase = () => {
    let arr = [];
    let i = 0;

    while (i < 50) {
      const randomIndex = Math.floor(Math.random() * easyWords.length);
      const randomWord = easyWords[randomIndex];
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
        charSpan.classList.remove("incorrect");
      } else {
        charSpan.classList.add("incorrect");
        charSpan.classList.remove("correct");
      }
    });
  };

  // count words
  useEffect(() => {
    const arrayValue = input.split("");
    const lastChar = arrayValue[arrayValue.length - 1];
    const wordList = displayPhrase.join("").split(" ");

    if (
      lastChar === " " &&
      lastChar === spanElements[arrayValue.length - 1].innerText
    ) {
      let word = displayPhrase
        .slice(wordIndex.current, arrayValue.length - 1)
        .join("");
      wordIndex.current = arrayValue.length;
      if (wordList[wordCount] === word) {
        setWordCount((prev) => prev + 1);
      }
    }

    // count incorrect
    if (
      lastChar &&
      lastChar !== spanElements[arrayValue.length - 1].innerText
    ) {
      numIncorrect.current += 1;
    } else if (
      lastChar &&
      lastChar === spanElements[arrayValue.length - 1].innerText
    ) {
      numCorrect.current += 1;
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
            className={`${isFocused ? "text-box " : "hidden "}`}
            value={input}
            onChange={(e) => handleChange(e)}
            autoFocus
          />
          <div className="quote">{quote}</div>
        </div>
      </div>
      <FaRedoAlt
        className="refresh-icon"
        size={20}
        onClick={() => window.location.reload()}
      />
    </div>
  );
};
