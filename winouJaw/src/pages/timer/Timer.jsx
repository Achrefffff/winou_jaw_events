// frontend/src/components/Timer/Timer.jsx
import React, { useContext, useEffect, useRef } from "react";
import { TimerContext } from "../../context/TimerContext";
import "./timer.css";

function Timer() {
  const {
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
  } = useContext(TimerContext);

  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:4000");

    ws.current.onopen = () => {
      console.log("WebSocket Connected");
    };

    ws.current.onerror = (error) => {
      console.log("WebSocket Error: ", error);
    };

    ws.current.onclose = () => {
      console.log("WebSocket Disconnected");
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type: "timeUpdate", timeLeft }));
    }
  }, [timeLeft]);

  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="timer-container">
      <h1>Compte à rebours</h1>
      <hr className="hr-dash" />
      <div className="input-group">
        <div className="input-container">
          <label>Heures</label>
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            placeholder="Heures"
            min="0"
            disabled={isRunning}
          />
        </div>
        <div className="input-container">
          <label>Minutes</label>
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            placeholder="Minutes"
            min="0"
            max="59"
            disabled={isRunning}
          />
        </div>
        <div className="input-container">
          <label>Secondes</label>
          <input
            type="number"
            value={seconds}
            onChange={(e) => setSeconds(Number(e.target.value))}
            placeholder="Secondes"
            min="0"
            max="59"
            disabled={isRunning}
          />
        </div>
      </div>
      <div>
        {!isRunning ? (
          <button className="button-time" onClick={handleStart}>
            Démarrer
          </button>
        ) : (
          <button className="button-time" onClick={handlePause}>
            Pause
          </button>
        )}
        <button className="button-time2" onClick={handleReset}>
          Réinitialiser
        </button>
      </div>
      <div>
        <h2>{formatTime(timeLeft)}</h2>
      </div>
    </div>
  );
}

export default Timer;
