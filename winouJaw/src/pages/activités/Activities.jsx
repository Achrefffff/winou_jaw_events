// Activities.jsx
import React, { useState, useEffect } from "react";
import {
  getActivities,
  createActivity,
  updateActivity,
  deleteActivity,
  getActivityById,
} from "../../services/activitiesService";
import { getEvents } from "../../services/eventsService";
import "./activities.css";

function Activities() {
  const [activities, setActivities] = useState([]);
  const [events, setEvents] = useState([]); // État pour stocker les événements
  const [activityData, setActivityData] = useState({
    event_id: "", // Ajouter l'event_id
    title: "",
    description: "",
    start_time: "",
    end_time: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const activities = await getActivities();
        setActivities(activities);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    const fetchEvents = async () => {
      try {
        const events = await getEvents();
        setEvents(events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchActivities();
    fetchEvents();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setActivityData({ ...activityData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateActivity(activityData.activity_id, activityData);
      } else {
        await createActivity(activityData);
      }
      const activities = await getActivities();
      setActivities(activities);
      resetForm();
    } catch (error) {
      console.error("Error creating/updating activity:", error);
    }
  };

  const handleEditActivity = async (activity) => {
    try {
      const activityDetails = await getActivityById(activity.activity_id);
      setActivityData({
        ...activityDetails,
      });
      setIsEditing(true);
      setShowForm(true);
    } catch (error) {
      console.error("Error fetching activity details:", error);
    }
  };

  const handleDeleteActivity = async (id) => {
    try {
      await deleteActivity(id);
      const activities = await getActivities();
      setActivities(activities);
    } catch (error) {
      console.error("Error deleting activity:", error);
    }
  };

  const resetForm = () => {
    setActivityData({
      event_id: "",
      title: "",
      description: "",
      start_time: "",
      end_time: "",
    });
    setIsEditing(false);
    setShowForm(false);
  };

  return (
    <div className="activities-container">
      <div className="header">
        <h1 className="title">Gestion des Activités</h1>
        <button className="button-add" onClick={() => setShowForm(true)}>
          Ajouter une activité
        </button>
      </div>
      {showForm && (
        <div className="overlay">
          <div className="form-container">
            <form onSubmit={handleSubmit} className="activity-form">
              <h2>
                {isEditing ? "Modifier Activité" : "Ajouter une Activité"}
              </h2>
              <div className="form-group">
                <label>Événement</label>
                <select
                  className="form-control"
                  name="event_id"
                  value={activityData.event_id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Sélectionnez un événement</option>
                  {events.map((event) => (
                    <option key={event.event_id} value={event.event_id}>
                      {event.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Titre</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  placeholder="Titre de l'activité"
                  value={activityData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  className="form-control"
                  name="description"
                  placeholder="Description"
                  value={activityData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Heure de Début</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="start_time"
                  value={activityData.start_time}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Heure de Fin</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="end_time"
                  value={activityData.end_time}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                {isEditing ? "Sauvegarder" : "Ajouter"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={resetForm}
              >
                Annuler
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="table-container">
        <h2>Liste des activités</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Description</th>
              <th>Heure de Début</th>
              <th>Heure de Fin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.activity_id}>
                <td>{activity.title}</td>
                <td>{activity.description}</td>
                <td>{activity.start_time}</td>
                <td>{activity.end_time}</td>
                <td>
                  <button
                    className="button-activities"
                    onClick={() => handleEditActivity(activity)}
                  >
                    Modifier
                  </button>
                  <button
                    className="button-activities"
                    onClick={() => handleDeleteActivity(activity.activity_id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Activities;
