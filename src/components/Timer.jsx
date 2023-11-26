import { useRef } from "react";
export const Timer = ({ input, spanElements, totalTime }) => {
  //FIXME: timer is not ending
  const timer = useRef(null);
  const getTimerTime = (current) => {
    return Math.floor((new Date() - current) / 1000);
  };

  if (input.length === 1) {
    const currentTime = new Date();
    timer.current = setInterval(() => {
      // console.log(getTimerTime(currentTime));
      totalTime.current = getTimerTime(currentTime);
    }, 1000);
  }

  if (input.length === spanElements.length - 1 && spanElements.length !== 0) {
    console.log("wpm", Math.floor(30 / (totalTime.current / 60)));
    console.log("finished");
    // wpm.current = Math.floor(30 / (totalTime.current / 60));
    clearInterval(timer.current);
  }

  return <></>;
};
