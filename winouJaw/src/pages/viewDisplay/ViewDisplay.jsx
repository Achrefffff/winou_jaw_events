import React, { useContext, useEffect } from "react";
import { TimerContext } from "../../context/TimerContext";
import "./viewdisplay.css";

function ViewDisplay() {
  const { timeLeft } = useContext(TimerContext);

  useEffect(() => {
    console.log("ViewDisplay - timeLeft:", timeLeft);
  }, [timeLeft]);

  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="timer-container">
      <h1>Affichage du Compte à rebours</h1>
      <hr className="hr-dash" />
      <div>
        <h2>{formatTime(timeLeft)}</h2>
      </div>
    </div>
  );
}

export default ViewDisplay;
