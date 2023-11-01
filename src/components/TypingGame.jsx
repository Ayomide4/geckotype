import React from "react";
import { useState } from "react";

export const TypingGame = () => {
  const [input, setInput] = useState("");
  const quote = "Hello this is a sentence that means absolutely nothing";
  const newQuote = quote.split("");

  const test = newQuote.map((char, index) => {
    return <span key={index}>{char}</span>;
  });

  const element = document.querySelectorAll("span");

  /*
   *

const handleChange = (e) => {
  const value = e.target.value;
  const currentChar = value[value.length - 1];
  setInput(e.target.value);

  element.forEach((span, index) => {
    if (index === value.length - 1) {
      if (currentChar === newQuote[value.length - 1]) {
        span.classList.add("correct");
        span.classList.remove("incorrect");
      } else {
        span.classList.remove("correct");
        span.classList.add("incorrect");
      }
    } else if (index < value.length - 1) {
      span.classList.add("correct");
      span.classList.remove("incorrect");
    } else {
      span.classList.remove("correct");
      span.classList.remove("incorrect");
    }
  });
};
   * */

  const handleChange = (e) => {
    const value = e.target.value;
    const currentChar = value[value.length - 1];
    setInput(e.target.value);

    element.forEach((span, index) => {
      if (index === value.length - 1) {
        if (currentChar === newQuote[value.length - 1]) {
          span.classList.add("correct");
          span.classList.remove("incorrect");
        } else {
          span.classList.remove("correct");
          span.classList.add("incorrect");
        }
      } else if (index < value.length - 1) {
        span.classList.add("correct");
        span.classList.remove("incorrect");
      } else {
        span.classList.remove("correct");
        span.classList.remove("incorrect");
      }
    });
  };

  return (
    <div>
      <div className="game-container">
        <input value={input} onChange={(e) => handleChange(e)} />
        <div className="quote">{test}</div>
      </div>
    </div>
  );
};
