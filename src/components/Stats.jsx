import { IoIosArrowForward } from "react-icons/io";

export const Stats = ({
  setFinished,
  numCorrect,
  numIncorrect,
  totalChars,
  totalTime,
}) => {
  //FIXME: accuracy is not correct
  const handleRestart = () => {
    setFinished(false);
  };

  let correctWpm = Math.floor(
    numCorrect.current / 5 / (totalTime.current / 60),
  );
  let rawWpm = Math.floor(
    (numCorrect.current + numIncorrect.current) / 5 / (totalTime.current / 60),
  );

  return (
    <div className="stats-container">
      <h2 className="wpm">WPM: {correctWpm}</h2>
      <h2 className="acc">
        Accuracy: {Math.floor((numCorrect.current / totalChars) * 100)}%
      </h2>
      <h2> Raw: {rawWpm}</h2>
      <h2>
        Characters {numCorrect.current}/{numIncorrect.current}
      </h2>
      <h2> Total Time {totalTime.current}s</h2>

      <IoIosArrowForward className="arrow" onClick={handleRestart} />
    </div>
  );
};
