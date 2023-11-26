import React from "react";
import { FaRedoAlt } from "react-icons/fa";
import { easyWords } from "./CommonWords";
import { useState, useEffect, useRef } from "react";

export const Typing = ({
  input,
  setInput,
  setNumCorrect,
  isFocused,
  setIsFocused,
  numWords,
  setNumIncorrect,
  setFinished,
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

    while (i < numWords) {
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

    arrayValue.forEach((char, index) => {
      if (index === arrayValue.length - 1) {
        spanElements[index].classList.add("caret");
      } else {
        spanElements[index].classList.remove("caret");
      }
    });

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
      setNumIncorrect((prev) => prev + 1);
    } else if (
      // count correct
      lastChar &&
      lastChar === spanElements[arrayValue.length - 1].innerText
    ) {
      if (input.length === spanElements.length - 1) {
        setFinished(true);
        setInput("");
      }
      setNumCorrect((prev) => prev + 1);
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
    //FIXME: this is a hacky way to refresh the page
    if (e.key === "Enter" && e.shiftKey) {
      window.location.reload();
    }

    if (e.key === "Backspace") {
      const arrayValue = input.split("");
      if (arrayValue.length > 0 && arrayValue[arrayValue.length - 1]) {
        spanElements[arrayValue.length - 1].classList.remove("caret");
      }
    }
  });

  useEffect(() => {
    generatePhrase();
  }, [numWords]);

  return (
    <div>
      <div className="game-container ">
        {isFocused && (
          <p className="word-count">
            {wordCount}/{numWords}
          </p>
        )}
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
