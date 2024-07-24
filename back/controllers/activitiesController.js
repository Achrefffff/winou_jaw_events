const activitiesModel = require("../models/activitiesModel");

const getAllActivities = async (req, res) => {
  try {
    const activities = await activitiesModel.getAllActivities();
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getActivityById = async (req, res) => {
  try {
    const activity = await activitiesModel.getActivityById(req.params.id);
    if (activity) {
      res.status(200).json(activity);
    } else {
      res.status(404).json({ message: "Activity not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createActivity = async (req, res) => {
  try {
    const { title, description, start_time, end_time, event_id } = req.body;

    if (!title || !description || !start_time || !end_time || !event_id) {
      throw new Error("Missing required fields");
    }

    const activity = {
      title,
      description,
      start_time,
      end_time,
    };
    const activityId = await activitiesModel.createActivity(activity);

    // Ajout de l'association dans la table EventActivities
    await activitiesModel.addEventActivityAssociation(event_id, activityId);

    res.status(201).json({ activityId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateActivity = async (req, res) => {
  try {
    const { title, description, start_time, end_time } = req.body;

    if (!title || !description || !start_time || !end_time) {
      throw new Error("Missing required fields");
    }

    const activity = {
      title,
      description,
      start_time,
      end_time,
    };
    await activitiesModel.updateActivity(req.params.id, activity);
    res.status(200).json({ message: "Activity updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteActivity = async (req, res) => {
  try {
    await activitiesModel.deleteActivity(req.params.id);
    res.status(200).json({ message: "Activity deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllActivities,
  getActivityById,
  createActivity,
  updateActivity,
  deleteActivity,
};
