import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";
const API = import.meta.env.VITE_API_URL;

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [tournaments, setTournaments] = useState([]);
  const [availableTournaments, setAvailableTournaments] = useState([]);
  const [roomCode, setRoomCode] = useState("");
  const [nextMatch, setNextMatch] = useState(null);
  const [room, setRoom] = useState(null);
  const [stats, setStats] = useState(null);

  const addRoomCode = async () => {
    try {
      await axios.put(`${API}/api/rooms/code`, {
        room_id: room.id,
        room_code: roomCode
      });

      alert("Code eFootball ajouté");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Erreur ajout code");
    }
  };

  const createRoom = async () => {
    if (!nextMatch) {
      return;
    }

    try {
      await axios.post(`${API}/api/rooms/create`, {
        match_id: nextMatch.id,
        host_player: nextMatch.player_one,
        guest_player: nextMatch.player_two
      });

      alert("Salle créée avec succès");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Erreur création salle");
    }
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    // Mes tournois
    axios
      .get(`${API}/api/tournaments/player/${user.id}`)
      .then((response) => {
        setTournaments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // Tournois disponibles
    axios
      .get(`${API}/api/tournaments`)
      .then((response) => {
        const openTournaments = response.data.filter(
          (tournament) => tournament.status === "open"
        );
        setAvailableTournaments(openTournaments);
      })
      .catch((error) => {
        console.log(error);
      });

    // Prochain match
    axios
      .get(`${API}/api/matches/player/${user.id}/next`)
      .then((response) => {
        console.log("Prochain match :", response.data);
        setNextMatch(response.data);

        if (response.data) {
          axios
            .get(`${API}/api/rooms/${response.data.id}`)
            .then((roomResponse) => {
              console.log("Salle eFootball :", roomResponse.data);
              setRoom(roomResponse.data);
            })
            .catch((error) => {
              console.log("Erreur salle :", error);
            });
        }
      })
      .catch((error) => {
        console.log("Erreur prochain match :", error);
      });

    // Statistiques joueur
    axios
      .get(`${API}/api/users/profile/${user.id}`)
      .then((response) => {
        console.log("Stats joueur :", response.data);
        setStats(response.data);
      })
      .catch((error) => {
        console.log("Erreur stats :", error);
      });
  }, []);

  return (
    <div className="dashboard">
      <h1>🏆 Bienvenue sur ArenaFoot</h1>

      <div className="dashboard-container">
        {/* PROFIL */}
        <div className="dashboard-card">
          <h2>👤 Profil</h2>
          <p>Pseudo : {user?.pseudo}</p>
          <p>ID eFootball : {user?.efootball_id}</p>
          <button onClick={() => navigate("/profile")}>Voir mon profil</button>
        </div>

        {/* MES TOURNOIS */}
        <div className="dashboard-card">
          <h2>🏆 Mes tournois</h2>
          {tournaments.length > 0 ? (
            tournaments.map((tournament) => (
              <div key={tournament.id}>
                <p>🏆 {tournament.name}</p>
                <p>Statut : {tournament.status}</p>
                <p>Paiement : {tournament.payment_status}</p>
              </div>
            ))
          ) : (
            <p>Aucun tournoi pour le moment</p>
          )}

          <button onClick={() => navigate("/tournaments")}>
            Voir les tournois
          </button>
        </div>

        {/* TOURNOIS DISPONIBLES */}
        <div className="dashboard-card">
          <h2>🎮 Tournois disponibles</h2>

          {availableTournaments.length > 0 ? (
            availableTournaments.map((tournament) => {
              const playersCount = Number(tournament.players_count) || 0;
              const playersLimit = Number(tournament.players_limit) || 16;
              const isFull = playersCount >= playersLimit;

              return (
                <div
                  key={tournament.id}
                  style={{
                    borderBottom: "1px solid #eee",
                    paddingBottom: "10px",
                    marginBottom: "10px"
                  }}
                >
                  <p>🏆 {tournament.name}</p>
                  <p>💰 Participation : {tournament.entry_fee} FCFA</p>
                  <p>🎁 Récompense : {tournament.reward} FCFA</p>
                  <p style={{ fontWeight: "bold", color: isFull ? "red" : "inherit" }}>
                    👥 Places : {playersCount}/{playersLimit}
                  </p>

                  {/* VÉRIFICATION : Si le tournoi est complet (16/16), masquer le bouton */}
                  {!isFull ? (
                    <button onClick={() => navigate("/tournaments")}>
                      Participer
                    </button>
                  ) : (
                    <span
                      style={{
                        backgroundColor: "#fee2e2",
                        color: "#dc2626",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontWeight: "bold",
                        fontSize: "0.9rem"
                      }}
                    >
                      🚫 Complet (Inscriptions fermées)
                    </span>
                  )}
                </div>
              );
            })
          ) : (
            <p>Aucun tournoi disponible</p>
          )}
        </div>

        {/* PROCHAIN MATCH */}
        <div className="dashboard-card">
          <h2>🎮 Prochain match</h2>

          {nextMatch ? (
            <>
              <p>🏆 {nextMatch.round}</p>
              <h3>
                {nextMatch.player_one_name}
                {" VS "}
                {nextMatch.player_two_name}
              </h3>
              <p>Statut : {nextMatch.status}</p>

              {room ? (
                <>
                  {room.room_code ? (
                    <>
                      <p>🎮 Code salle : {room.room_code}</p>
                      <p>Statut salle : {room.status}</p>
                    </>
                  ) : (
                    <>
                      <p>🎮 Salle créée mais code manquant</p>
                      {Number(room.host_player) === Number(user.id) && (
                        <>
                          <input
                            type="text"
                            placeholder="Code salle eFootball"
                            value={roomCode}
                            onChange={(e) => setRoomCode(e.target.value)}
                          />
                          <button onClick={addRoomCode}>Ajouter le code</button>
                        </>
                      )}
                    </>
                  )}
                </>
              ) : (
                <p>🎮 Salle non créée</p>
              )}

              {Number(nextMatch.player_one) === Number(user.id) && !room && (
                <button onClick={createRoom}>Créer la salle eFootball</button>
              )}

              {room && room.room_code && (
                <button onClick={() => navigate(`/room/${nextMatch.id}`)}>
                  Rejoindre la salle
                </button>
              )}
            </>
          ) : (
            <p>Aucun match prévu</p>
          )}
        </div>

        {/* STATISTIQUES */}
        <div className="dashboard-card">
          <h2>📊 Statistiques</h2>
          {stats ? (
            <>
              <p>Matchs joués : {stats.matches_played}</p>
              <p>Victoires : {stats.wins}</p>
              <p>Défaites : {stats.losses}</p>
              <p>Taux victoire : {stats.win_rate}%</p>
            </>
          ) : (
            <p>Chargement...</p>
          )}
        </div>

       {/* RÉCOMPENSES */}
<div className="dashboard-card reward-card">

  <div className="card-header">
    <div>
      <span className="card-label">
        💰 RÉCOMPENSES
      </span>

      <h2>
        Mes gains
      </h2>
    </div>

    <div className="card-icon">
      🏆
    </div>
  </div>

  <div className="reward-amount">
    {stats?.total_rewards || 0}
    <span> FCFA</span>
  </div>

  <p>
    Total des récompenses obtenues
  </p>

</div>
      </div>
    </div>
  );
}

export default Dashboard;