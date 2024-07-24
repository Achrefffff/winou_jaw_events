import React, { createContext, useState, useEffect, useRef } from "react";

const TimerContext = createContext();

const TimerProvider = ({ children }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    console.log("Timer updated: ", timeLeft, "isRunning: ", isRunning);
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft <= 0) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, timeLeft]);


  const handleStart = () => {
    if (!isRunning && timeLeft === 0) {
      const totalSeconds = hours * 3600 + minutes * 60 + seconds;
      setTimeLeft(totalSeconds);
    }
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(0);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  return (
    <TimerContext.Provider
      value={{
        timeLeft,
        isRunning,
        hours,
        minutes,
        seconds,
        setHours,
        setMinutes,
        setSeconds,
        handleStart,
        handlePause,
        handleReset,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export { TimerContext, TimerProvider };
