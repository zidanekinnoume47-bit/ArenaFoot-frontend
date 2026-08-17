import React, { useEffect, useState } from "react";
import {
  getPlayers,
  getTournaments,
  deleteTournament,
  getRewards,
  sendReward,
  getPayments
} from "../service/adminService";

import Sidebar from "../components/admin/Sidebar";
import DashboardCards from "../components/admin/DashboardCards";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const [players, setPlayers] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loadingMap, setLoadingMap] = useState({});

  const refreshAllData = async () => {
    getPayments().then((data) => setPayments(Array.isArray(data) ? data : []));
    getRewards().then((data) => setRewards(Array.isArray(data) ? data : []));
    getPlayers().then((data) => setPlayers(Array.isArray(data) ? data : []));
    getTournaments().then((data) => setTournaments(Array.isArray(data) ? data : []));
  };

  useEffect(() => {
    refreshAllData();
  }, []);

  const handleDeleteTournament = async (id) => {
    if (!window.confirm("Supprimer ce tournoi ?")) return;
    const data = await deleteTournament(id);
    alert(data.message);
    const list = await getTournaments();
    setTournaments(list);
  };

  const handleSendReward = async (id) => {
    const data = await sendReward(id);
    alert(data.message);
    const list = await getRewards();
    setRewards(list);
  };

  // FONCTION TEST : Déclencher l'ajout de 15 joueurs de test avec statut 'PAID'
  const handleAdd15TestPlayers = async (tournamentId) => {
    if (!window.confirm("Voulez-vous simuler l'ajout de 15 joueurs de test payés pour ce tournoi ?")) {
      return;
    }

    setLoadingMap((prev) => ({ ...prev, [tournamentId]: true }));

    try {
      // Remarque: Assurez-vous d'avoir exporté createTestPlayers dans adminService.js 
      // ou effectuez le fetch direct comme suit :
      const token = localStorage.getItem("token"); // Si vous utilisez un token JWT
      const response = await fetch(`/api/admin/tournaments/${tournamentId}/test-players`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : ""
        }
      });

      const data = await response.json();

      if (response.ok) {
        alert("🎉 " + (data.message || "15 joueurs créés et marqués comme payés !"));
        refreshAllData(); // Recharger les cartes, joueurs et paiements
      } else {
        alert("❌ Erreur : " + (data.error || data.message || "Impossible d'ajouter les joueurs."));
      }
    } catch (err) {
      console.error("Erreur lors de la simulation :", err);
      alert("❌ Une erreur est survenue lors de la simulation.");
    } finally {
      setLoadingMap((prev) => ({ ...prev, [tournamentId]: false }));
    }
  };

  return (
    <div className="admin-page">
      <Sidebar />

<div className="admin-content">
          <h1>👑 ArenaFoot Admin</h1>

          <Link
  to="/admin/create-tournament"
  style={{
    display: "inline-block",
    marginBottom: "25px",
    padding: "12px 20px",
    background: "#2563EB",
    color: "white",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "bold"
  }}
>
  ➕ Créer un tournoi
</Link>

        <DashboardCards
          players={players}
          tournaments={tournaments}
          payments={payments}
        />

        <h2>Joueurs</h2>
        <p>Nombre de joueurs : {players.length}</p>

        <h2>Tournois</h2>

        {tournaments.map((t) => {
          // Calcul du nombre de joueurs inscrits et payés pour ce tournoi
          const tournamentPayments = payments.filter(
            (p) => (p.tournament === t.name || p.tournament_id === t.id) && p.status === "success"
          );
const isFull = tournamentPayments.length >= (t.players_limit || 16);
          return (
            <div
              key={t.id}
              className={`tournament-admin-card ${isFull ? "tournament-full" : ""}`}
            >
            <div className="tournament-header">               
              <h3>{t.name}</h3>
                {isFull && (
                <span className="full-badge">
    FULL ({t.players_limit}/{t.players_limit})
</span>
                )}
              </div>

              <p>Participation : {t.entry_fee} FCFA</p>
              <p>Récompense : {t.reward} FCFA</p>
              <p className={`payment-count ${isFull ? "payment-full" : ""}`}>                
Paiements validés : {tournamentPayments.length} / {t.players_limit || 16}
              </p>

              <div className="tournament-actions">                
                <button>👥 Participants</button>
                <button>🏆 Bracket</button>
                <button>✏ Modifier</button>

                {/* BOUTON DE TEST SIMULATION */}
                <button
                  onClick={() => handleAdd15TestPlayers(t.id)}
                  disabled={loadingMap[t.id] || isFull}
                  style={{
                    backgroundColor: isFull ? "#cbd5e1" : "#8b5cf6",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "4px",
                    cursor: isFull ? "not-allowed" : "pointer",
                    fontWeight: "bold"
                  }}
                >
                  {loadingMap[t.id] ? "⏳ Inscription en cours..." : "🧪 Ajouter 15 Joueurs Test (Payés)"}
                </button>

                <button 
                  onClick={() => handleDeleteTournament(t.id)}
                  style={{ backgroundColor: "#dc2626", color: "white", border: "none", borderRadius: "4px", padding: "8px 12px" }}
                >
                  🗑 Supprimer
                </button>
              </div>
            </div>
          );
        })}

        <h2>🏆 Récompenses</h2>

        {rewards.map((reward) => (
          <div
            key={reward.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              marginBottom: "10px",
              borderRadius: "8px"
            }}
          >
            <p>👤 {reward.pseudo}</p>
            <p>🏆 {reward.tournament}</p>
            <p>💰 {reward.amount} FCFA</p>
            <p>📱 {reward.phone}</p>
            <p>📌 {reward.status}</p>

            {reward.status === "waiting" && (
              <button onClick={() => handleSendReward(reward.id)}>
                📤 Envoyer
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;