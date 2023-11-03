import React from "react";
import { commonWords } from "./CommonWords";
import { useState, useEffect } from "react";

export const TypingGame = () => {
  const [input, setInput] = useState("");
  const [displayPhrase, setDisplayPhrase] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const element = document.querySelectorAll("span");

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
    console.log(arr);
    setDisplayPhrase(arr);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const arrayValue = value.split("");
    setInput(e.target.value);

    element.forEach((charSpan, index) => {
      const currentChar = arrayValue[index];
      console.log(currentChar, charSpan.innerText);
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

  useEffect(() => {
    generatePhrase();
  }, []);

  return (
    <div>
      <h1>geckotype</h1>
      <div className="game-container ">
        {isFocused ? <></> : <p>Click here or start typing to focus</p>}
        <div
          className={`${isFocused ? "quote" : "quote unfocused"}`}
          onClick={focusInput}
        >
          <input value={input} onChange={(e) => handleChange(e)} autoFocus />
          <div className="quote">{test2}</div>
        </div>
      </div>
    </div>
  );
};
