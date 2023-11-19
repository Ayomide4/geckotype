import { IoIosArrowForward } from "react-icons/io";

export const Stats = ({ setFinished, wpm, numIncorrect }) => {
  const handleRestart = () => {
    setFinished(false);
  };

  console.log("num incorrect", numIncorrect);

  return (
    <div className="stats-container">
      <h2 className="wpm">WPM: {wpm.current}</h2>
      <h2 className="acc">Accuracy: {30 / numIncorrect} </h2>
      <IoIosArrowForward className="arrow" onClick={handleRestart} />
    </div>
  );
};
