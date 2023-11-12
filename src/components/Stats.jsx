export const Stats = ({ setFinished, wpm }) => {
  const handleRestart = () => {
    setFinished(false);
  };

  return (
    <div className="stats-container">
      <h2 className="wpm">WPM: {wpm.current}</h2>
      <h2 className="acc">Accuracy: </h2>
      <button className="restart-btn" onClick={handleRestart}>
        Restart
      </button>
    </div>
  );
};
