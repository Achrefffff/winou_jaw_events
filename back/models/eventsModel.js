const db = require("../db");

const getAllEvents = async () => {
  const [rows] = await db.query(`
    SELECT 
      Events.*, 
      COUNT(EventActivities.activity_id) AS activity_count
    FROM Events
    LEFT JOIN EventActivities ON Events.event_id = EventActivities.event_id
    GROUP BY Events.event_id
  `);
  return rows;
};

const getEventById = async (id) => {
  const [rows] = await db.query("SELECT * FROM Events WHERE event_id = ?", [
    id,
  ]);
  return rows[0];
};

const createEvent = async (event) => {
  const { user_id, name, description, start_datetime, end_datetime, logo } =
    event;
  const [result] = await db.query(
    "INSERT INTO Events (user_id, name, description, start_datetime, end_datetime, logo) VALUES (?, ?, ?, ?, ?, ?)",
    [user_id, name, description, start_datetime, end_datetime, logo]
  );
  return result.insertId;
};

const updateEvent = async (id, event) => {
  const { user_id, name, description, start_datetime, end_datetime, logo } =
    event;
  await db.query(
    "UPDATE Events SET user_id = ?, name = ?, description = ?, start_datetime = ?, end_datetime = ?, logo = ? WHERE event_id = ?",
    [user_id, name, description, start_datetime, end_datetime, logo, id]
  );
};

const deleteEvent = async (id) => {
  await db.query("DELETE FROM Events WHERE event_id = ?", [id]);
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
