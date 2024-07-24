import React, { useState, useEffect, useRef } from "react";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventActivities,
  getEventById,
} from "../../services/eventsService";
import "./events.css";

function Events() {
  const [events, setEvents] = useState([]);
  const [eventData, setEventData] = useState({
    user_id: 1,
    name: "",
    description: "",
    start_datetime: "",
    end_datetime: "",
    logo: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [activities, setActivities] = useState([]);
  const [showActivities, setShowActivities] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const ws = useRef(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = await getEvents();
        setEvents(events);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();

    ws.current = new WebSocket("ws://localhost:4000");

    ws.current.onopen = () => {
      console.log("WebSocket Connected");
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket Error:", error);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleFileChange = (e) => {
    setEventData({ ...eventData, logo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(eventData).forEach((key) => {
      if (key === "logo" && eventData[key] === null) {
        return;
      }
      formData.append(key, eventData[key]);
    });

    try {
      if (isEditing) {
        await updateEvent(eventData.event_id, formData);
      } else {
        await createEvent(formData);
      }
      const updatedEvents = await getEvents();
      setEvents(updatedEvents);
      resetForm();
    } catch (error) {
      console.error("Error creating/updating event:", error);
    }
  };

  const handleEditEvent = async (event) => {
    try {
      const eventDetails = await getEventById(event.event_id);
      setEventData({
        ...eventDetails,
        logo: null,
      });
      setIsEditing(true);
      setShowForm(true);
    } catch (error) {
      console.error("Error fetching event details:", error);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await deleteEvent(id);
      const updatedEvents = await getEvents();
      setEvents(updatedEvents);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleShowActivities = async (event_id) => {
    try {
      const activities = await getEventActivities(event_id);
      setActivities(activities);
      setShowActivities(true);
    } catch (error) {
      console.error("Error fetching event activities:", error);
    }
  };

  const handleSelectEvent = (event) => {
    console.log("Selected event ID:", event.event_id);
    setSelectedEventId(event.event_id);
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type: "eventSelection", event }));
    }
  };

  const resetForm = () => {
    setEventData({
      user_id: 1,
      name: "",
      description: "",
      start_datetime: "",
      end_datetime: "",
      logo: null,
    });
    setIsEditing(false);
    setShowForm(false);
  };

  return (
    <div className="events-container">
      <div className="header">
        <h1 className="title">Gestion des Événements</h1>
        <button className="button-add" onClick={() => setShowForm(true)}>
          Ajouter un événement
        </button>
      </div>
      {showForm && (
        <div className="overlay">
          <div className="form-container">
            <form onSubmit={handleSubmit} className="event-form">
              <h2>
                {isEditing ? "Modifier Événement" : "Ajouter un Événement"}
              </h2>
              <div className="form-group">
                <label>Nom</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Nom de l'événement"
                  value={eventData.name}
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
                  value={eventData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Heure de Début</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="start_datetime"
                  value={eventData.start_datetime}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Heure de Fin</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="end_datetime"
                  value={eventData.end_datetime}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Logo</label>
                <input
                  type="file"
                  className="form-control"
                  name="logo"
                  onChange={handleFileChange}
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
        <h2>Liste des événements</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Logo</th>
              <th>Nom</th>
              <th>Description</th>
              <th>Heure de Début</th>
              <th>Heure de Fin</th>
              <th>Nombre d'Activités</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.event_id}>
                <td>
                  {event.logo && (
                    <img
                      src={`http://localhost:4000/${event.logo.replace(
                        /\\/g,
                        "/"
                      )}`}
                      alt={event.name}
                      style={{
                        width: "30px",
                        height: "30px",
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  )}
                </td>
                <td>{event.name}</td>
                <td>{event.description}</td>
                <td>{new Date(event.start_datetime).toLocaleString()}</td>
                <td>{new Date(event.end_datetime).toLocaleString()}</td>
                <td>
                  <button
                    className="button-events"
                    onClick={() => handleShowActivities(event.event_id)}
                  >
                    {event.activity_count}
                  </button>
                </td>
                <td>
                  <button
                    className="button-events"
                    onClick={() => handleEditEvent(event)}
                  >
                    Modifier
                  </button>
                  <button
                    className="button-events"
                    onClick={() => handleDeleteEvent(event.event_id)}
                  >
                    Supprimer
                  </button>
                  <button
                    className={`button-events ${
                      event.event_id === selectedEventId ? "selected22" : ""
                    }`}
                    onClick={() => handleSelectEvent(event)}
                  >
                    Sélectionner
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showActivities && (
          <div className="activities-modal">
            <h2>Activités de l'événement</h2>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Titre</th>
                  <th>Description</th>
                  <th>Heure de Début</th>
                  <th>Heure de Fin</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity.activity_id}>
                    <td>{activity.title}</td>
                    <td>{activity.description}</td>
                    <td>{activity.start_time}</td>
                    <td>{activity.end_time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="btn btn-secondary"
              onClick={() => setShowActivities(false)}
            >
              Fermer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;
