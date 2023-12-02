import React, { useState, useRef } from "react";
import { CiClock1 } from "react-icons/ci";
import { FaFont, FaQuoteLeft, FaAt, FaHashtag } from "react-icons/fa";
export default function ModeSelect({ isFocused, setNumWords, notify }) {
  const [selected, setSelected] = useState(false);

  //FIXME: fix css highlight for selected numWords
  const selectNumWords = (e) => {
    const numWords = e.target.innerText;
    setNumWords(numWords);
    document.querySelector(".selected")?.classList.remove("selected");
    e.target.classList.add("selected");
  };

  const numbers = [10, 25, 50];
  const numWords = numbers.map((num, index) => {
    return (
      <div
        className={
          selected ? "mode-item selected numbers" : "mode-item numbers"
        }
        key={index}
        onClick={(e) => selectNumWords(e)}
      >
        <p>{num}</p>
      </div>
    );
  });

  return (
    <div className={isFocused ? "mode-select-focused" : "mode-select"}>
      <div className="mode-container">
        <div className="mode-options ">
          <div className="mode-item" onClick={notify}>
            <FaAt size={14} className="at" />
            <p>Punctuation</p>
          </div>
          <div className="mode-item" onClick={notify}>
            <FaHashtag size={14} />
            <p>Numbers</p>
          </div>
        </div>
        <div className="spacer"></div>

        <div className="mode-item" onClick={notify}>
          <CiClock1 size={14} />
          <p>Time</p>
        </div>
        <div className="mode-item">
          <FaFont size={14} />
          <p>Words</p>
        </div>
        <div className="mode-item" onClick={notify}>
          <FaQuoteLeft size={14} />
          <p>Quotes</p>
        </div>
        <div className="spacer"></div>
        <div className="mode-options ">{numWords}</div>
      </div>
    </div>
  );
}
