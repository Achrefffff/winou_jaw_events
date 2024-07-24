const WebSocket = require("ws");
const activitiesModel = require("../models/activitiesModel");

const setupWebSocket = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    console.log("Client connected");

    ws.on("message", async (message) => {
      console.log("Received message:", message);

      try {
        const data = JSON.parse(message);

        if (data.type === "timeUpdate") {
          const totalTime = 3600; // Set your total time in seconds here
          const responseData = JSON.stringify({
            type: "timeUpdate",
            timeLeft: data.timeLeft,
            totalTime,
          });

          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(responseData);
            }
          });
        } else if (data.type === "eventSelection") {
          const eventResponseData = JSON.stringify({
            type: "eventSelection",
            event: data.event,
          });

          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(eventResponseData);
            }
          });
        } else if (data.type === "subscribeToActivityUpdates") {
          const activities = await activitiesModel.getAllActivities();
          const activityUpdateData = JSON.stringify({
            type: "activityUpdates",
            activities,
          });

          ws.send(activityUpdateData);
        }
      } catch (error) {
        console.error("Error parsing message:", error);
      }
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
    });

    ws.on("close", () => {
      console.log("WebSocket connection closed");
    });
  });

  // Broadcast activity updates every minute
  setInterval(async () => {
    const activities = await activitiesModel.getAllActivities();
    const activityUpdateData = JSON.stringify({
      type: "activityUpdates",
      activities,
    });

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(activityUpdateData);
      }
    });
  }, 60000); // 60000 ms = 1 minute

  return wss;
};

module.exports = setupWebSocket;
