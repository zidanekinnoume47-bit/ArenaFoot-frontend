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

  // ==================================
  // Ajouter le code de salle
  // ==================================
  const addRoomCode = async () => {
    try {
      await axios.put(`${API}/api/rooms/code`, {
        room_id: room.id,
        room_code: roomCode
      });

      alert("Code de salle ajouté");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Erreur ajout code");
    }
  };

  // ==================================
  // Créer une salle
  // ==================================
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

  // ==================================
  // Chargement des données
  // ==================================
  useEffect(() => {
    if (!user) {
      return;
    }

    // ==================================
    // Mes tournois
    // ==================================
    axios
      .get(`${API}/api/tournaments/player/${user.id}`)
      .then((response) => {
        setTournaments(response.data);
      })
      .catch((error) => {
        console.log("Erreur mes tournois :", error);
      });

    // ==================================
    // Tournois disponibles
    // ==================================
    axios
      .get(`${API}/api/tournaments`)
      .then((response) => {
        const openTournaments = response.data.filter(
          (tournament) => tournament.status === "open"
        );

        setAvailableTournaments(openTournaments);
      })
      .catch((error) => {
        console.log("Erreur tournois disponibles :", error);
      });

    // ==================================
    // Prochain match
    // ==================================
    axios
      .get(`${API}/api/matches/player/${user.id}/next`)
      .then((response) => {
        console.log("Prochain match :", response.data);

        setNextMatch(response.data);

        if (response.data) {
          axios
            .get(`${API}/api/rooms/${response.data.id}`)
            .then((roomResponse) => {
              console.log("Salle :", roomResponse.data);
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

    // ==================================
    // Statistiques joueur
    // ==================================
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

      {/* ==================================
          HEADER
      ================================== */}

      <div className="dashboard-header">
        <h1>
          <i className="bi bi-trophy-fill"></i>
          Bienvenue sur ArenaFoot
        </h1>

        <p>
          Participe aux tournois, affronte les meilleurs
          et tente de décrocher la victoire.
        </p>
      </div>

      <div className="dashboard-container">

        {/* ==================================
            PROFIL
        ================================== */}

        <div className="dashboard-card">

          <div className="card-header">
            <div>
              <span className="card-label">
                <i className="bi bi-person-circle"></i>
                MON COMPTE
              </span>

              <h2>
                Profil
              </h2>
            </div>

            <div className="card-icon">
              <i className="bi bi-person-fill"></i>
            </div>
          </div>

          <div className="profile-info">

            <p>
              <strong>Pseudo :</strong>{" "}
              {user?.pseudo}
            </p>

            <p>
              <strong>ID eFootball :</strong>{" "}
              {user?.efootball_id || "Non renseigné"}
            </p>

          </div>

          <button
            className="dashboard-btn"
            onClick={() => navigate("/profile")}
          >
            <i className="bi bi-person-lines-fill"></i>
            Voir mon profil
          </button>

        </div>


        {/* ==================================
            MES TOURNOIS
        ================================== */}

        <div className="dashboard-card">

          <div className="card-header">
            <div>
              <span className="card-label">
                <i className="bi bi-trophy-fill"></i>
                COMPÉTITIONS
              </span>

              <h2>
                Mes tournois
              </h2>
            </div>

            <div className="card-icon">
              <i className="bi bi-trophy-fill"></i>
            </div>
          </div>

          {tournaments.length > 0 ? (

            <div className="tournament-list">

              {tournaments.map((tournament) => (

                <div
                  key={tournament.id}
                  className="tournament-item"
                >

                  <p className="tournament-name">
                    <i className="bi bi-controller"></i>
                    {tournament.name}
                  </p>

                  <p>
                    <i className="bi bi-activity"></i>
                    Statut :
                    <strong>
                      {" "}
                      {tournament.status}
                    </strong>
                  </p>

                  <p>
                    <i className="bi bi-credit-card"></i>
                    Paiement :
                    <strong>
                      {" "}
                      {tournament.payment_status}
                    </strong>
                  </p>

                </div>

              ))}

            </div>

          ) : (

            <div className="empty-state">

              <i className="bi bi-controller"></i>

              <p>
                Aucun tournoi pour le moment
              </p>

            </div>

          )}

          <button
            className="dashboard-btn"
            onClick={() => navigate("/tournaments")}
          >
            <i className="bi bi-grid-fill"></i>
            Voir les tournois
          </button>

        </div>


        {/* ==================================
            TOURNOIS DISPONIBLES
        ================================== */}

        <div className="dashboard-card">

          <div className="card-header">

            <div>

              <span className="card-label">
                <i className="bi bi-controller"></i>
                COMPÉTITIONS
              </span>

              <h2>
                Tournois disponibles
              </h2>

            </div>

            <div className="card-icon">
              <i className="bi bi-controller"></i>
            </div>

          </div>


          {availableTournaments.length > 0 ? (

            <div className="available-tournaments">

              {availableTournaments.map((tournament) => {

                const playersCount =
                  Number(tournament.players_count) || 0;

                const playersLimit =
                  Number(tournament.players_limit) || 16;

                const isFull =
                  playersCount >= playersLimit;

                const progress =
                  Math.min(
                    (playersCount / playersLimit) * 100,
                    100
                  );

                return (

                  <div
                    key={tournament.id}
                    className="available-tournament"
                  >

                    <div className="available-header">

                      <h3>
                        <i className="bi bi-trophy-fill"></i>
                        {tournament.name}
                      </h3>

                      <span
                        className={
                          isFull
                            ? "status-badge full"
                            : "status-badge open"
                        }
                      >
                        {isFull ? (
                          <>
                            <i className="bi bi-x-circle-fill"></i>
                            Complet
                          </>
                        ) : (
                          <>
                            <i className="bi bi-check-circle-fill"></i>
                            Ouvert
                          </>
                        )}
                      </span>

                    </div>


                    <div className="tournament-details">

                      <p>
                        <i className="bi bi-cash-coin"></i>
                        <span>
                          Participation
                        </span>

                        <strong>
                          {tournament.entry_fee} FCFA
                        </strong>
                      </p>


                      <p>
                        <i className="bi bi-award-fill"></i>
                        <span>
                          Récompense
                        </span>

                        <strong>
                          {tournament.reward} FCFA
                        </strong>
                      </p>


                      <p>
                        <i className="bi bi-people-fill"></i>
                        <span>
                          Joueurs
                        </span>

                        <strong>
                          {playersCount}/{playersLimit}
                        </strong>
                      </p>

                    </div>


                    {/* PROGRESSION */}

                    <div className="tournament-progress">

                      <div className="progress-track">

                        <div
                          className="progress-value"
                          style={{
                            width: `${progress}%`
                          }}
                        ></div>

                      </div>

                      <small>
                        {isFull
                          ? "Toutes les places sont prises."
                          : `${playersLimit - playersCount} place(s) disponible(s)`
                        }
                      </small>

                    </div>


                    {/* ACTION */}

                    {!isFull ? (

                      <button
                        className="participate-btn"
                        onClick={() =>
                          navigate("/tournaments")
                        }
                      >
                        <i className="bi bi-lightning-charge-fill"></i>
                        Participer
                      </button>

                    ) : (

                      <div className="closed-tournament">

                        <i className="bi bi-lock-fill"></i>

                        <span>
                          Inscriptions fermées
                        </span>

                      </div>

                    )}

                  </div>

                );

              })}

            </div>

          ) : (

            <div className="empty-state">

              <i className="bi bi-calendar-x"></i>

              <p>
                Aucun tournoi disponible
              </p>

            </div>

          )}

        </div>


        {/* ==================================
            PROCHAIN MATCH
        ================================== */}

        <div className="dashboard-card">

          <div className="card-header">

            <div>

              <span className="card-label">
                <i className="bi bi-controller"></i>
                MATCH
              </span>

              <h2>
                Prochain match
              </h2>

            </div>

            <div className="card-icon">
              <i className="bi bi-controller"></i>
            </div>

          </div>


          {nextMatch ? (

            <>

              <div className="match-round">

                <i className="bi bi-trophy"></i>

                <span>
                  {nextMatch.round}
                </span>

              </div>


              <div className="match-versus">

                <div className="player">
                  {nextMatch.player_one_name}
                </div>

                <div className="vs">
                  VS
                </div>

                <div className="player">
                  {nextMatch.player_two_name}
                </div>

              </div>


              <p className="match-status">

                <i className="bi bi-activity"></i>

                Statut :
                <strong>
                  {" "}
                  {nextMatch.status}
                </strong>

              </p>


              {/* SALLE */}

              {room ? (

                <div className="room-section">

                  {room.room_code ? (

                    <>

                      <div className="room-info">

                        <p>
                          <i className="bi bi-key-fill"></i>
                          Code salle
                        </p>

                        <strong>
                          {room.room_code}
                        </strong>

                      </div>


                      <p>
                        <i className="bi bi-broadcast"></i>
                        Statut salle :
                        {" "}
                        {room.status}
                      </p>

                    </>

                  ) : (

                    <>

                      <div className="room-warning">

                        <i className="bi bi-exclamation-circle-fill"></i>

                        <span>
                          Salle créée mais code manquant
                        </span>

                      </div>


                      {Number(room.host_player) === Number(user.id) && (

                        <div className="room-form">

                          <input
                            type="text"
                            placeholder="Code salle eFootball"
                            value={roomCode}
                            onChange={(e) =>
                              setRoomCode(e.target.value)
                            }
                          />

                          <button
                            className="dashboard-btn"
                            onClick={addRoomCode}
                          >
                            <i className="bi bi-check-circle-fill"></i>
                            Ajouter le code
                          </button>

                        </div>

                      )}

                    </>

                  )}

                </div>

              ) : (

                <div className="room-warning">

                  <i className="bi bi-door-closed-fill"></i>

                  <span>
                    Salle non créée
                  </span>

                </div>

              )}


              {/* CRÉER SALLE */}

              {Number(nextMatch.player_one) === Number(user.id) &&
                !room && (

                  <button
                    className="dashboard-btn"
                    onClick={createRoom}
                  >
                    <i className="bi bi-plus-circle-fill"></i>
                    Créer la salle eFootball
                  </button>

                )}


              {/* REJOINDRE SALLE */}

              {room && room.room_code && (

                <button
                  className="participate-btn"
                  onClick={() =>
                    navigate(`/room/${nextMatch.id}`)
                  }
                >
                  <i className="bi bi-box-arrow-in-right"></i>
                  Rejoindre la salle
                </button>

              )}

            </>

          ) : (

            <div className="empty-state">

              <i className="bi bi-calendar-check"></i>

              <p>
                Aucun match prévu
              </p>

            </div>

          )}

        </div>


        {/* ==================================
            STATISTIQUES
        ================================== */}

        <div className="dashboard-card">

          <div className="card-header">

            <div>

              <span className="card-label">
                <i className="bi bi-bar-chart-fill"></i>
                PERFORMANCE
              </span>

              <h2>
                Statistiques
              </h2>

            </div>

            <div className="card-icon">
              <i className="bi bi-graph-up-arrow"></i>
            </div>

          </div>


          {stats ? (

            <div className="stats-grid">

              <div className="stat-item">

                <i className="bi bi-controller"></i>

                <span>
                  Matchs joués
                </span>

                <strong>
                  {stats.matches_played}
                </strong>

              </div>


              <div className="stat-item">

                <i className="bi bi-trophy-fill"></i>

                <span>
                  Victoires
                </span>

                <strong>
                  {stats.wins}
                </strong>

              </div>


              <div className="stat-item">

                <i className="bi bi-x-circle-fill"></i>

                <span>
                  Défaites
                </span>

                <strong>
                  {stats.losses}
                </strong>

              </div>


              <div className="stat-item">

                <i className="bi bi-percent"></i>

                <span>
                  Taux victoire
                </span>

                <strong>
                  {stats.win_rate}%
                </strong>

              </div>

            </div>

          ) : (

            <div className="empty-state">

              <i className="bi bi-hourglass-split"></i>

              <p>
                Chargement...
              </p>

            </div>

          )}

        </div>


        {/* ==================================
            RÉCOMPENSES
        ================================== */}

        <div className="dashboard-card reward-card">

          <div className="card-header">

            <div>

              <span className="card-label">
                <i className="bi bi-cash-stack"></i>
                RÉCOMPENSES
              </span>

              <h2>
                Mes gains
              </h2>

            </div>

            <div className="card-icon">
              <i className="bi bi-trophy-fill"></i>
            </div>

          </div>


          <div className="reward-amount">

            {stats?.total_rewards || 0}

            <span>
              {" "}FCFA
            </span>

          </div>


          <p>
            <i className="bi bi-check-circle-fill"></i>
            Total des récompenses obtenues
          </p>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;