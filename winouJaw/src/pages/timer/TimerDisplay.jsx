import React, { useEffect, useState, useRef } from "react";
import { getEventActivities } from "../../services/eventsService";
import "./display.css";

function TimerDisplay() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activities, setActivities] = useState([]);
  const ws = useRef(null);

  const connectWebSocket = () => {
    ws.current = new WebSocket("ws://localhost:4000");

    ws.current.onopen = () => {
      console.log("WebSocket Connected");
      ws.current.send(JSON.stringify({ type: "subscribeToActivityUpdates" }));
      setError(null);
    };

    ws.current.onerror = (errorEvent) => {
      console.error("WebSocket Error:", errorEvent);
      setError("WebSocket error. Please check the connection.");
    };

    ws.current.onmessage = async (event) => {
      console.log("Received data:", event.data);
      try {
        const data = JSON.parse(event.data);
        console.log("Parsed data:", data);
        if (data.type === "activityUpdates" && data.activities) {
          if (selectedEvent) {
            const eventActivities = await getEventActivities(
              selectedEvent.event_id
            );
            setActivities(eventActivities);
          } else {
            setActivities([]);
          }
        } else if (data.type === "eventSelection" && data.event) {
          setSelectedEvent(data.event);
          const eventActivities = await getEventActivities(data.event.event_id);
          setActivities(eventActivities);
        } else {
          console.error("Invalid data received");
          setError("Invalid data received.");
        }
      } catch (error) {
        console.error("Error parsing JSON!", error);
        setError("Error parsing data.");
      }
    };

    ws.current.onclose = () => {
      console.log("WebSocket Disconnected");
      setTimeout(connectWebSocket, 1000);
    };
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  const calculateTimeLeft = (endDate) => {
    const now = new Date();
    const totalSeconds = Math.floor((endDate - now) / 1000);
    return totalSeconds > 0 ? formatTime(totalSeconds) : "00:00:00";
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivities((activities) =>
        activities.map((activity) => {
          const currentDate = new Date();
          const [hours, minutes, seconds] = activity.end_time
            .split(":")
            .map(Number);
          const endDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate(),
            hours,
            minutes,
            seconds
          );
          return {
            ...activity,
            timeLeft: calculateTimeLeft(endDate),
          };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [activities]);

  return (
    <div className="container6">
      <div className="leftside">
        {selectedEvent && (
          <div className="event-card">
            {selectedEvent.logo && (
              <img
                className="event-logo6"
                src={`http://localhost:4000/${selectedEvent.logo.replace(
                  /\\/g,
                  "/"
                )}`}
                alt={selectedEvent.name}
              />
            )}
            <h2>{selectedEvent.name}</h2>
            <p>{selectedEvent.description}</p>
            <p>
              Start: {new Date(selectedEvent.start_datetime).toLocaleString()}
            </p>
            <p>End: {new Date(selectedEvent.end_datetime).toLocaleString()}</p>
            <div className="activities">
              <h3>Activities:</h3>
              {activities.length > 0 ? (
                activities.map((activity) => {
                  const currentDate = new Date();
                  const [hours, minutes, seconds] = activity.end_time
                    .split(":")
                    .map(Number);
                  const endDate = new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    currentDate.getDate(),
                    hours,
                    minutes,
                    seconds
                  );
                  const timeLeft = calculateTimeLeft(endDate);
                  return (
                    <div key={activity.activity_id} className="activity">
                      <p>Title: {activity.title}</p>
                      <p>Description: {activity.description}</p>
                      <p>Start: {activity.start_time}</p>
                      <p>End: {activity.end_time}</p>
                      <p>Time Left: {timeLeft}</p>
                    </div>
                  );
                })
              ) : (
                <p>Mafama chay</p>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="rightside">
        <h1>{formatTime(timeLeft)}</h1>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default TimerDisplay;
