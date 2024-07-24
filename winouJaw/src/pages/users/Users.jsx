import React, { useState, useEffect } from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../../services/userService";
import "./users.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [formUser, setFormUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    fonction: "",
    role: "",
    password_hash: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const users = await getUsers();
      setUsers(users);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await updateUser(formUser.user_id, formUser);
      } else {
        await createUser(formUser);
      }
      fetchUsers();
      resetForm();
    } catch (error) {
      console.error(
        "Erreur lors de la soumission du formulaire:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleEditUser = (user) => {
    setFormUser(user);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (error) {
      console.error(
        "Erreur lors de la suppression de l'utilisateur:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const resetForm = () => {
    setFormUser({
      first_name: "",
      last_name: "",
      email: "",
      fonction: "",
      role: "",
      password_hash: "",
    });
    setIsEditing(false);
    setShowForm(false);
  };

  return (
    <div className="users-container">
      <div className="header">
        <h1 className="title">Gestion des Utilisateurs</h1>
        <button className="button-add" onClick={() => setShowForm(true)}>
          Ajouter un utilisateur
        </button>
      </div>
      {showForm && (
        <div className="overlay">
          <div className="form-container">
            <form onSubmit={handleFormSubmit} className="user-form">
              <h2>
                {isEditing ? "Modifier Utilisateur" : "Ajouter un Utilisateur"}
              </h2>
              <div className="form-group">
                <label>Prénom</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Prénom"
                  value={formUser.first_name}
                  onChange={(e) =>
                    setFormUser({ ...formUser, first_name: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Nom</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nom"
                  value={formUser.last_name}
                  onChange={(e) =>
                    setFormUser({ ...formUser, last_name: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  value={formUser.email}
                  onChange={(e) =>
                    setFormUser({ ...formUser, email: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Fonction</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Fonction"
                  value={formUser.fonction}
                  onChange={(e) =>
                    setFormUser({ ...formUser, fonction: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Rôle</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Rôle"
                  value={formUser.role}
                  onChange={(e) =>
                    setFormUser({ ...formUser, role: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Mot de passe</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Mot de passe"
                  value={formUser.password_hash}
                  onChange={(e) =>
                    setFormUser({ ...formUser, password_hash: e.target.value })
                  }
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
        <h2>Liste des utilisateurs</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Fonction</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.user_id}>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>{user.fonction}</td>
                <td>
                  <button
                    className="button-users"
                    onClick={() => handleEditUser(user)}
                  >
                    Modifier
                  </button>
                  <button
                    className="button-users"
                    onClick={() => handleDeleteUser(user.user_id)}
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

export default Users;
