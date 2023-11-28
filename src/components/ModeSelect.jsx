import React, { useState } from "react";
import { CiClock1 } from "react-icons/ci";
import { FaFont, FaQuoteLeft, FaAt, FaHashtag } from "react-icons/fa";
export default function ModeSelect({ isFocused, setNumWords }) {
  const [selected, setSelected] = useState(false);

  //FIXME: fix css highlight for selected numWords
  const selectNumWords = (e) => {
    const numWords = e.target.innerText;
    setNumWords(numWords);
  };

  const numbers = [10, 25, 50];
  const numWords = numbers.map((num, index) => {
    return (
      <div
        className={selected ? "mode-item selected" : "mode-item"}
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
          <div className="mode-item">
            <FaAt size={14} className="at" />
            <p>Punctuation</p>
          </div>
          <div className="mode-item">
            <FaHashtag size={14} />
            <p>Numbers</p>
          </div>
        </div>
        <div className="spacer"></div>

        <div className="mode-item">
          <CiClock1 size={14} />
          <p>Time</p>
        </div>
        <div className="mode-item">
          <FaFont size={14} />
          <p>Words</p>
        </div>
        <div className="mode-item">
          <FaQuoteLeft size={14} />
          <p>Quotes</p>
        </div>
        <div className="spacer"></div>
        <div className="mode-options ">{numWords}</div>
      </div>
    </div>
  );
}
