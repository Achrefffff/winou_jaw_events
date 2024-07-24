
import api from "../api";

export const getActivities = async () => {
  try {
    const response = await api.get("/activities");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getActivityById = async (id) => {
  try {
    const response = await api.get(`/activities/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createActivity = async (activityData) => {
  try {
    const response = await api.post("/activities", activityData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateActivity = async (id, activityData) => {
  try {
    const response = await api.put(`/activities/${id}`, activityData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteActivity = async (id) => {
  try {
    const response = await api.delete(`/activities/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
