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
  id,
}) => {
  const [displayPhrase, setDisplayPhrase] = useState([]);
  const [wordCount, setWordCount] = useState(0);
  const spanElements = document.querySelectorAll("span.char");
  const wordIndex = useRef(0);
  const [map, setMap] = useState(new Map());

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

  const quote = displayPhrase.map((char, index) => {
    return (
      <span key={index} className="char">
        {char}
      </span>
    );
  });

  const restart = () => {
    setInput("");
    setWordCount(0);
    setFinished(false);
    setIsFocused(false);
    wordIndex.current = 0;
    clearInterval(id.current);
    generatePhrase();
    id.current = null;
    spanElements.forEach((span) => {
      span.classList.remove("correct");
      span.classList.remove("incorrect");
      span.classList.remove("caret");
    });
  };

  const handleChange = (e) => {
    let arrayValue = e.target.value.split("");
    let lastIndex = arrayValue.length - 1;
    const lastChar = arrayValue[lastIndex];
    setInput(e.target.value);

    //update map
    setMap((prevCharMap) => {
      const newCharMap = new Map(prevCharMap);
      newCharMap.set(lastIndex, arrayValue[lastIndex]);
      return newCharMap;
    });

    //FIXME: once page is refreshed first char bugs out
    //is it because phrase is regenerated so spanElements is different? therefore span elemnts shoudl be a state?
    // if (spanElements[lastIndex] !== undefined) {
    if (map.has(lastIndex)) {
    } else if (lastIndex >= 0) {
      if (lastChar && lastChar !== displayPhrase[lastIndex]) {
        setNumIncorrect((prev) => prev + 1);
      } else if (
        lastChar &&
        arrayValue[lastIndex] === displayPhrase[lastIndex]
      ) {
        setNumCorrect((prev) => prev + 1);
      }
    }
    if (
      lastChar === displayPhrase[lastIndex] &&
      arrayValue.length === spanElements.length - 1
    ) {
      setFinished(true);
      setInput("");
    }

    displayPhrase.forEach((char, index) => {
      const currentChar = arrayValue[index];

      if (currentChar == null) {
        spanElements[index].classList.remove("correct");
        spanElements[index].classList.remove("incorrect");
      } else if (currentChar === char && spanElements[index] !== undefined) {
        spanElements[index].classList.add("correct");
        spanElements[index].classList.remove("incorrect");
      } else {
        spanElements[index].classList.add("incorrect");
        spanElements[index].classList.remove("correct");
      }
    });
  };

  // count words
  useEffect(() => {
    const arrayValue = input.split("");
    const lastIndex = arrayValue.length - 1;
    const lastChar = arrayValue[lastIndex];
    const wordList = displayPhrase.join("").split(" ");

    arrayValue.forEach((char, index) => {
      if (index === lastIndex) {
        spanElements[index].classList.add("caret");
      } else {
        spanElements[index].classList.remove("caret");
      }
    });

    if (lastChar === " " && lastChar === spanElements[lastIndex].innerText) {
      let word = displayPhrase.slice(wordIndex.current, lastIndex).join("");
      wordIndex.current = arrayValue.length;
      if (wordList[wordCount] === word) {
        setWordCount((prev) => prev + 1);
      }
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
      restart();
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
      <FaRedoAlt className="refresh-icon" size={20} onClick={restart} />
    </div>
  );
};
