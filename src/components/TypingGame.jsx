import React from "react";
import { commonWords } from "./CommonWords";
import { useState, useEffect } from "react";

export const TypingGame = ({ input, setInput, spanElements }) => {
  const [displayPhrase, setDisplayPhrase] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [wordCount] = useState(0);

  //TODO: use cb for generate phrase
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

  //when first character is typed, start timer

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
