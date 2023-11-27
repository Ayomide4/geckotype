import { useRef } from "react";
export const Timer = ({ input, spanElements, totalTime, finished }) => {
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

  if (finished) {
    console.log("clearing interval");
    clearInterval(id.current);
    id.current = null;
  }

  return <></>;
};
