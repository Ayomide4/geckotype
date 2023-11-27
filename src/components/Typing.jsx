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
  const [map, setMap] = useState(new Map());

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
    let arrayValue = e.target.value.split("");
    let lastIndex = arrayValue.length - 1;
    const lastChar = arrayValue[lastIndex];
    setInput(e.target.value);

    setMap((prevCharMap) => {
      const newCharMap = new Map(prevCharMap);
      newCharMap.set(lastIndex, arrayValue[lastIndex]);
      return newCharMap;
    });

    console.log("last", lastIndex);

    //FIXME: once page is refreshed first char bugs out
    if (spanElements[lastIndex] !== undefined) {
      if (map.has(lastIndex)) {
      } else if (lastIndex >= 0) {
        if (lastChar && lastChar !== spanElements[lastIndex].innerText) {
          setNumIncorrect((prev) => prev + 1);
        } else if (
          lastChar &&
          arrayValue[lastIndex] === spanElements[lastIndex].innerText
        ) {
          console.log("correct");
          setNumCorrect((prev) => prev + 1);
        }
      }
      if (
        lastChar === spanElements[lastIndex].innerText &&
        arrayValue.length === spanElements.length - 1
      ) {
        setFinished(true);
        setInput("");
        arrayValue = [];
        lastIndex = arrayValue.length - 1;
      }
    }

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
    //TODO: refactor this into handleChange
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

    //TODO: use hash table to makde sure count is correct

    // count incorrect
    // if (lastChar && lastChar !== spanElements[lastIndex].innerText) {
    //   setNumIncorrect((prev) => prev + 1);
    // } else if (
    //   // count correct
    //   lastChar &&
    //   lastChar === spanElements[lastIndex].innerText
    // ) {
    //   if (input.length === spanElements.length - 1) {
    //     setFinished(true);
    //     console.log("finished");
    //     setInput("");
    //   }
    //   console.log("correct");
    //   setNumCorrect((prev) => prev + 1);
    // }
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
