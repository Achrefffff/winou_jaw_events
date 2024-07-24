import React, { useState } from "react";
import "./dashboard.css";
import Events from "../events/Events";
import Users from "../users/Users";
import Timer from "../timer/Timer";
import Reports from "../reports/Reports";
import Tdb from "../tdb/Tdb"; 
import Activities from "../activités/Activities";

function Dashboard() {
  const [activeComponent, setActiveComponent] = useState("Tableau de bord"); // Initialiser à "Tableau de bord"

  const renderComponent = () => {
    switch (activeComponent) {
      case "Tableau de bord":
        return <Tdb />;
      case "Evénements":
        return <Events />;
      case "Activités":
        return <Activities />;
      case "Utilisateurs":
        return <Users />;
      case "Minuteur":
        return <Timer />;
      case "Rapports":
        return <Reports />;
      default:
        return <h1 className="h-righty">Dashboard</h1>;
    }
  };

  return (
    <>
      <div className="navi">
        <img className="img3" src="src/assets/Winoujaw.png" alt="Logo" />
        <h3 className="titre-navi">WinouJaw</h3>
      </div>
      <div className="conti">
        <div className="lefti">
          <ul className="sidebar-menu">
            <li
              className="sidebar-item"
              onClick={() => setActiveComponent("Tableau de bord")}
            >
              Tableau de bord
            </li>
            <li
              className="sidebar-item"
              onClick={() => setActiveComponent("Evénements")}
            >
              Evénements
            </li>
            <li
              className="sidebar-item"
              onClick={() => setActiveComponent("Activités")}
            >
              Activités
            </li>
            <li
              className="sidebar-item"
              onClick={() => setActiveComponent("Minuteur")}
            >
              Minuteur
            </li>
            <li
              className="sidebar-item"
              onClick={() => setActiveComponent("Rapports")}
            >
              Rapports
            </li>
            <li
              className="sidebar-item"
              onClick={() => setActiveComponent("Utilisateurs")}
            >
              Utilisateurs
            </li>
          </ul>
        </div>
        <div className="righty">
          {renderComponent()}
          {activeComponent === "Dashboard" && <hr className="hr-dash" />}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
