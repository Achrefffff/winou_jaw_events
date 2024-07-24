const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const eventsRoutes = require("./routes/eventsRoute");
const activitiesRoutes = require("./routes/activitiesRoute");
const setupWebSocket = require("./socket/socket");
const http = require("http");
const path = require("path");

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());

// Middleware for logging requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/activities", activitiesRoutes);

setupWebSocket(server);

const PORT = process.env.PORT || 4000;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
