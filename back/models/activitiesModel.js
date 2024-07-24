const db = require("../db");

const getAllActivities = async () => {
  const [rows] = await db.query("SELECT * FROM Activities");
  return rows;
};

const getActivityById = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM Activities WHERE activity_id = ?",
    [id]
  );
  return rows[0];
};

const createActivity = async (activity) => {
  const { title, description, start_time, end_time } = activity;
  const [result] = await db.query(
    "INSERT INTO Activities (title, description, start_time, end_time) VALUES (?, ?, ?, ?)",
    [title, description, start_time, end_time]
  );
  return result.insertId;
};

const updateActivity = async (id, activity) => {
  const { title, description, start_time, end_time } = activity;
  await db.query(
    "UPDATE Activities SET title = ?, description = ?, start_time = ?, end_time = ? WHERE activity_id = ?",
    [title, description, start_time, end_time, id]
  );
};

const deleteActivity = async (id) => {
  await db.query("DELETE FROM Activities WHERE activity_id = ?", [id]);
};

const addEventActivityAssociation = async (event_id, activity_id) => {
  await db.query(
    "INSERT INTO EventActivities (event_id, activity_id) VALUES (?, ?)",
    [event_id, activity_id]
  );
};

const getActivitiesByEventId = async (eventId) => {
  const [rows] = await db.query(
    "SELECT a.* FROM Activities AS a INNER JOIN eventactivities AS ea ON a.activity_id = ea.activity_id WHERE ea.event_id = ?",
    [eventId]
  );
  return rows;
};

module.exports = {
  getAllActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
  addEventActivityAssociation,
  getActivitiesByEventId,
};
