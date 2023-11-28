import { useRef } from "react";
export const Timer = ({ input, totalTime, finished, id }) => {
  const getTimerTime = (current) => {
    return Math.floor((new Date() - current) / 1000);
  };

  if (input.length === 1) {
    const currentTime = new Date();
    id.current = setInterval(() => {
      console.log(getTimerTime(currentTime));
      totalTime.current = getTimerTime(currentTime);
    }, 1000);
  }

  if (finished) {
    clearInterval(id.current);
    id.current = null;
  }

  return <></>;
};
