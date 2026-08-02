import React from "react";
import { Link } from "react-router-dom";
import "../../styles/admin.css";

function Sidebar() {
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

      <Link to="/">🚪 Déconnexion</Link>
    </div>
  );
}

export default Sidebar;