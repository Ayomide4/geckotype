import { useRef } from "react";
export const Timer = ({ input, totalTime, finished, id }) => {
  const getTimerTime = (current) => {
    return Math.floor((new Date() - current) / 1000);
  };

  if (!id.current && input.length === 1) {
    const currentTime = new Date();
    id.current = setInterval(() => {
      console.log(getTimerTime(currentTime));
      totalTime.current = getTimerTime(currentTime);
    }, 1000);
    console.log("id in timer", id.current);
  }

  if (finished && id.current) {
    clearInterval(id.current);
    id.current = null;
  }

  return <></>;
};
