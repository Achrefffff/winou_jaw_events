import React, { useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      console.log("Login successful:", data);
      localStorage.setItem("token", data.token); // Stocker le token
      navigate("/dashboard"); // Rediriger l'utilisateur
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <>
      <div className="big-cont">
        <div className="container-left">
          <img src="src/assets/Winoujaw.png" alt="logo" />
        </div>
        <div className="container-right">
          <div className="cont-form">
            <img className="img1" src="src/assets/Winoujaw.png" alt="logo" />
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Votre Adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password">Mot de passe</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Choisissez un mot de passe sécurisé"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button className="button-log" type="submit">
                Connexion
              </button>
            </form>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div>
              <p>
                Vous n'avez pas de compte ?{" "}
                <Link to="/signup">s'inscrire ici !</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
