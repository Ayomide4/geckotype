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
  let correctWpm = Math.floor(temp / (totalTime.current / 60));
  let rawWpm = Math.floor(
    (numCorrect + numIncorrect) / 5 / (totalTime.current / 60),
  );

  return (
    <div className="stats-container">
      <h2 className="wpm">WPM: {correctWpm}</h2>
      <h2 className="acc">
        Accuracy: {Math.floor((numCorrect / totalChars) * 100)}%
      </h2>
      <h2> Raw: {rawWpm}</h2>
      <h2>
        Characters {numCorrect}/{numIncorrect}
      </h2>
      <h2> Total Time {totalTime.current}s</h2>

      <IoIosArrowForward className="arrow" onClick={handleRestart} />
    </div>
  );
};
