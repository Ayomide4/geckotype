import { IoIosArrowForward } from "react-icons/io";

export const Stats = ({
  setInput,
  setFinished,
  numCorrect,
  numIncorrect,
  totalChars,
  totalTime,
  setNumCorrect,
  setNumIncorrect,
  setIsFocused,
}) => {
  const handleRestart = () => {
    setFinished(false);
    setNumCorrect(0);
    setNumIncorrect(0);
    setIsFocused(false);
    // setInput("");
  };

  let temp = numCorrect / 5;
  //wpm should be total correct chars in total correct words / 5 normalized to 1 minute
  let correctWpm = Math.floor(temp / (totalTime.current / 60));
  let rawWpm = Math.floor(
    (numCorrect + numIncorrect) / 5 / (totalTime.current / 60),
  );

  return (
    <>
      <div className="stats-container">
        <div className="stat-line">
          <p className="">wpm</p>
          <h2 className="result">{correctWpm}</h2>
        </div>
        <div className="stat-line">
          <p className="acc">accuracy</p>
          <h2 className="result">
            {Math.floor((numCorrect / totalChars) * 100)}%
          </h2>
        </div>
        <div className="stat-line">
          <p>raw</p>
          <h2 className="result">{rawWpm}</h2>
        </div>
        <div className="stat-line">
          <p>characters</p>
          <h2 className="result">
            {numCorrect}/{numIncorrect}
          </h2>
        </div>
        <div className="stat-line">
          <p>time</p>
          <h2 className="result">{totalTime.current}s</h2>
        </div>
      </div>
      <IoIosArrowForward className="arrow" size={20} onClick={handleRestart} />
    </>
  );
};
