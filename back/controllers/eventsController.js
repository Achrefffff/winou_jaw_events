const eventsModel = require("../models/eventsModel");
const activitiesModel = require("../models/activitiesModel");

const getAllEvents = async (req, res) => {
  try {
    const events = await eventsModel.getAllEvents();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await eventsModel.getEventById(req.params.id);
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createEvent = async (req, res) => {
  try {
    const { user_id, name, description, start_datetime, end_datetime } =
      req.body;
    const logo = req.file ? req.file.path : null;

    if (!name || !description || !start_datetime || !end_datetime) {
      throw new Error("Missing required fields");
    }

    const event = {
      user_id,
      name,
      description,
      start_datetime,
      end_datetime,
      logo,
    };
    const eventId = await eventsModel.createEvent(event);
    res.status(201).json({ eventId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { user_id, name, description, start_datetime, end_datetime } =
      req.body;
    const logo = req.file ? req.file.path : null;

    if (!name || !description || !start_datetime || !end_datetime) {
      throw new Error("Missing required fields");
    }

    const event = {
      user_id,
      name,
      description,
      start_datetime,
      end_datetime,
      logo,
    };
    await eventsModel.updateEvent(req.params.id, event);
    res.status(200).json({ message: "Event updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    await eventsModel.deleteEvent(req.params.id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getEventActivities = async (req, res) => {
  const { id } = req.params;
  try {
    const activities = await activitiesModel.getActivitiesByEventId(id);
    res.status(200).json(activities);
  } catch (err) {z
    console.error("Error fetching event activities:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventActivities,
};
