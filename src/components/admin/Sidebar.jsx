import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/admin.css";

function Sidebar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    // Supprimer les informations de connexion admin
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");

    // Retour à la connexion admin
    navigate("/admin/arenafoot-control", {
      replace: true
    });
  };

  return (
    <div className="admin-sidebar">

      <h2>👑 ArenaFoot</h2>

      <Link to="/admin">🏠 Dashboard</Link>

      <Link to="/admin/players">👥 Joueurs</Link>

      <Link to="/admin/tournaments">🏆 Tournois</Link>

      <Link to="/admin/payments">💳 Paiements</Link>

      <Link to="/admin/matches">⚽ Matchs</Link>

      <Link to="/admin/rooms">🎮 Rooms</Link>

      <Link to="/admin/rewards">🎁 Récompenses</Link>

      <Link to="/admin/ranking">📊 Classement</Link>

      <Link to="/admin/settings">⚙️ Paramètres</Link>

      <button
        type="button"
        onClick={handleLogout}
        className="admin-logout-button"
      >
        🚪 Déconnexion
      </button>

    </div>
  );
}

export default Sidebar;