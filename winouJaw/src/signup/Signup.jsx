import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./signup.css";
import { registerUser } from "../api";

function Signup() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [fonction, setFonction] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const userData = {
        first_name: prenom,
        last_name: nom,
        email,
        fonction,
        password,
      };

      const data = await registerUser(userData);
      console.log("User registered successfully:", data);
      // Rediriger l'utilisateur ou mettre à jour l'état global
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <div className="big-cont2">
      <div className="container-left2">
        <img src="src/assets/Winoujaw.png" alt="logo" />
      </div>
      <div className="container-right2">
        <div className="cont-form2">
          <img className="img2" src="src/assets/Winoujaw.png" alt="logo" />
          <form onSubmit={handleSubmit}>
            <div className="form-container2">
              <div className="form-column2">
                <div className="form-group2">
                  <label htmlFor="nom">Nom</label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    placeholder="Votre Nom de famille"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                  />
                </div>
                <div className="form-group2">
                  <label htmlFor="prenom">Prénom</label>
                  <input
                    type="text"
                    id="prenom"
                    name="prenom"
                    placeholder="Votre Prénom"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                  />
                </div>
                <div className="form-group2">
                  <label htmlFor="fonction">Fonction</label>
                  <input
                    type="text"
                    id="fonction"
                    name="fonction"
                    placeholder="Votre poste ou titre professionnel"
                    value={fonction}
                    onChange={(e) => setFonction(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-column2">
                <div className="form-group2">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Adresse email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group2">
                  <label htmlFor="password">Mot de passe</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Choisissez un mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group2">
                  <label htmlFor="confirmPassword">
                    Confirmer votre mot de passe
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirmez le mot de passe"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <button className="button2" type="submit">
              Inscription
            </button>
          </form>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <div>
            <p>
              Vous avez déjà un compte ? <Link to="/login">Connectez-vous</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
