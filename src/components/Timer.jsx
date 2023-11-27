import { useRef } from "react";
export const Timer = ({ input, spanElements, totalTime }) => {
  const timer = useRef(null);
  let id = useRef(null);
  const getTimerTime = (current) => {
    return Math.floor((new Date() - current) / 1000);
  };

  if (!id.current && input.length === 1) {
    const currentTime = new Date();
    id.current = setInterval(() => {
      console.log(getTimerTime(currentTime));
      totalTime.current = getTimerTime(currentTime);
    }, 1000);
  }

  if (input.length === 5 && spanElements.length !== 0) {
    clearInterval(id.current);
    console.log("timer ended", id.current);
    id.current = null;
  }

  return <></>;
};
