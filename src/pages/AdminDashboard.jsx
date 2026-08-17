import React, { useEffect, useState } from "react";
import {
  getPlayers,
  getTournaments,
  deleteTournament,
  getRewards,
  sendReward,
  getPayments,
  createTestPlayers
} from "../service/adminService";

import Sidebar from "../components/admin/Sidebar";
import DashboardCards from "../components/admin/DashboardCards";

import { Link } from "react-router-dom";

import "../styles/admin.css";

function AdminDashboard() {

  const [players, setPlayers] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [payments, setPayments] = useState([]);

  const [loadingMap, setLoadingMap] = useState({});


  // ==========================================
  // CHARGEMENT
  // ==========================================

  const refreshAllData = async () => {

    try {

      const [
        paymentsData,
        rewardsData,
        playersData,
        tournamentsData
      ] = await Promise.all([
        getPayments(),
        getRewards(),
        getPlayers(),
        getTournaments()
      ]);


      setPayments(
        Array.isArray(paymentsData)
          ? paymentsData
          : []
      );

      setRewards(
        Array.isArray(rewardsData)
          ? rewardsData
          : []
      );

      setPlayers(
        Array.isArray(playersData)
          ? playersData
          : []
      );

      setTournaments(
        Array.isArray(tournamentsData)
          ? tournamentsData
          : []
      );

    } catch (error) {

      console.error(
        "Erreur chargement dashboard :",
        error
      );

    }

  };


  useEffect(() => {

    refreshAllData();

  }, []);


  // ==========================================
  // SUPPRIMER TOURNOI
  // ==========================================

  const handleDeleteTournament = async (id) => {

    if (
      !window.confirm(
        "⚠️ Supprimer définitivement ce tournoi ?"
      )
    ) {
      return;
    }


    try {

      const data =
        await deleteTournament(id);

      alert(data.message);

      refreshAllData();

    } catch (error) {

      console.error(error);

      alert(
        "Impossible de supprimer le tournoi."
      );

    }

  };


  // ==========================================
  // ENVOYER RÉCOMPENSE
  // ==========================================

  const handleSendReward = async (id) => {

    try {

      const data =
        await sendReward(id);

      alert(data.message);

      refreshAllData();

    } catch (error) {

      console.error(error);

      alert(
        "Erreur lors de l'envoi."
      );

    }

  };


  // ==========================================
  // JOUEURS TEST
  // ==========================================

  const handleAdd15TestPlayers = async (
    tournamentId
  ) => {

    if (
      !window.confirm(
        "🧪 Ajouter 15 joueurs de test payés à ce tournoi ?"
      )
    ) {
      return;
    }


    setLoadingMap((prev) => ({
      ...prev,
      [tournamentId]: true
    }));


    try {

      const data =
        await createTestPlayers(
          tournamentId
        );


      if (data.message) {

        alert(
          "🎉 " + data.message
        );

      } else {

        alert(
          "Simulation terminée."
        );

      }


      await refreshAllData();

    } catch (error) {

      console.error(
        "Erreur simulation :",
        error
      );

      alert(
        "❌ Impossible d'ajouter les joueurs test."
      );

    } finally {

      setLoadingMap((prev) => ({
        ...prev,
        [tournamentId]: false
      }));

    }

  };


  // ==========================================
  // CALCULS
  // ==========================================

  const successfulPayments =
    payments.filter(
      payment =>
        payment.status === "success"
    );


  const pendingRewards =
    rewards.filter(
      reward =>
        reward.status === "waiting"
    );


  return (

    <div className="admin-page">

      <Sidebar />


      <main className="admin-content">


        {/* =====================================
            HEADER
        ===================================== */}

        <section className="admin-dashboard-header">

          <div>

            <div className="admin-eyebrow">
              <span></span>
              CENTRE DE CONTRÔLE
            </div>


            <h1>
              👑 Arena<span>Foot</span>
            </h1>


            <p>
              Bienvenue dans votre espace
              d'administration.
            </p>

          </div>


          <Link
            to="/admin/create-tournament"
            className="create-tournament-button"
          >

            <span>＋</span>

            Créer un tournoi

          </Link>

        </section>



        {/* =====================================
            STATISTIQUES
        ===================================== */}

        <section className="dashboard-stats">

          <DashboardCards
            players={players}
            tournaments={tournaments}
            payments={payments}
          />

        </section>



        {/* =====================================
            ACTIVITÉ RAPIDE
        ===================================== */}

        <section className="admin-quick-stats">

          <div className="quick-stat">

            <div className="quick-stat-icon blue">
              👥
            </div>

            <div>

              <span>
                Joueurs
              </span>

              <strong>
                {players.length}
              </strong>

            </div>

          </div>


          <div className="quick-stat">

            <div className="quick-stat-icon green">
              💳
            </div>

            <div>

              <span>
                Paiements validés
              </span>

              <strong>
                {successfulPayments.length}
              </strong>

            </div>

          </div>


          <div className="quick-stat">

            <div className="quick-stat-icon purple">
              🏆
            </div>

            <div>

              <span>
                Tournois
              </span>

              <strong>
                {tournaments.length}
              </strong>

            </div>

          </div>


          <div className="quick-stat">

            <div className="quick-stat-icon orange">
              🎁
            </div>

            <div>

              <span>
                Récompenses à envoyer
              </span>

              <strong>
                {pendingRewards.length}
              </strong>

            </div>

          </div>

        </section>



        {/* =====================================
            TOURNOIS
        ===================================== */}

        <section className="admin-section">

          <div className="section-heading">

            <div>

              <div className="section-kicker">
                COMPÉTITIONS
              </div>

              <h2>
                🏆 Tournois
              </h2>

            </div>


            <Link
              to="/admin/tournaments"
              className="section-link"
            >
              Voir tous →
            </Link>

          </div>


          <div className="admin-tournaments-grid">

            {tournaments.length === 0 ? (

              <div className="admin-empty">

                <div>
                  🏆
                </div>

                <h3>
                  Aucun tournoi
                </h3>

                <p>
                  Créez votre premier tournoi
                  ArenaFoot.
                </p>

                <Link
                  to="/admin/create-tournament"
                  className="empty-button"
                >
                  Créer un tournoi
                </Link>

              </div>

            ) : (

              tournaments.map((tournament) => {

                const limit =
                  Number(
                    tournament.players_limit
                  ) || 16;


                const tournamentPayments =
                  payments.filter(
                    payment =>
                      (
                        payment.tournament ===
                        tournament.name
                        ||
                        Number(
                          payment.tournament_id
                        ) ===
                        Number(
                          tournament.id
                        )
                      )
                      &&
                      payment.status ===
                      "success"
                  );


                const playerCount =
                  tournamentPayments.length;


                const percentage =
                  Math.min(
                    Math.round(
                      (playerCount / limit) * 100
                    ),
                    100
                  );


                const isFull =
                  playerCount >= limit;


                return (

                  <article
                    key={tournament.id}
                    className={
                      `admin-tournament-card ${
                        isFull
                          ? "is-full"
                          : ""
                      }`
                    }
                  >


                    {/* TOP */}

                    <div className="tournament-card-top">

                      <div className="tournament-game-icon">
                        🎮
                      </div>


                      <div className="tournament-status">

                        <span
                          className={
                            isFull
                              ? "status-full"
                              : "status-open"
                          }
                        >
                          <i></i>

                          {isFull
                            ? "COMPLET"
                            : "OUVERT"
                          }

                        </span>

                      </div>

                    </div>



                    <h3>
                      {tournament.name}
                    </h3>


                    <div className="tournament-info-grid">

                      <div>

                        <span>
                          Participation
                        </span>

                        <strong>
                          {tournament.entry_fee}
                          <small>
                            FCFA
                          </small>
                        </strong>

                      </div>


                      <div>

                        <span>
                          Récompense
                        </span>

                        <strong>
                          {tournament.reward}
                          <small>
                            FCFA
                          </small>
                        </strong>

                      </div>

                    </div>



                    {/* PROGRESSION */}

                    <div className="tournament-progress">

                      <div className="progress-label">

                        <span>
                          Inscriptions
                        </span>

                        <strong>
                          {playerCount}/{limit}
                        </strong>

                      </div>


                      <div className="progress-track">

                        <div
                          className={
                            `progress-fill ${
                              isFull
                                ? "full"
                                : ""
                            }`
                          }
                          style={{
                            width:
                              `${percentage}%`
                          }}
                        />

                      </div>

                    </div>



                    {/* ACTIONS */}

                    <div className="tournament-card-actions">

                      <Link
                        to="/admin/tournaments"
                        className="action-primary"
                      >
                        Gérer
                      </Link>


                      <Link
                        to={`/tournaments/${tournament.id}/bracket`}
                        className="action-secondary"
                      >
                        🏆 Bracket
                      </Link>

                    </div>


                    <div className="tournament-extra-actions">

                      <button
                        onClick={() =>
                          handleAdd15TestPlayers(
                            tournament.id
                          )
                        }
                        disabled={
                          loadingMap[
                            tournament.id
                          ] ||
                          isFull
                        }
                        className="test-button"
                      >

                        {loadingMap[
                          tournament.id
                        ]
                          ? "⏳ Ajout..."
                          : "🧪 Joueurs test"
                        }

                      </button>


                      <button
                        onClick={() =>
                          handleDeleteTournament(
                            tournament.id
                          )
                        }
                        className="delete-button"
                      >
                        🗑
                      </button>

                    </div>

                  </article>

                );

              })

            )}

          </div>

        </section>



        {/* =====================================
            RÉCOMPENSES
        ===================================== */}

        <section className="admin-section">

          <div className="section-heading">

            <div>

              <div className="section-kicker">
                PAIEMENTS
              </div>

              <h2>
                🎁 Récompenses
              </h2>

            </div>


            <Link
              to="/admin/rewards"
              className="section-link"
            >
              Voir toutes →
            </Link>

          </div>


          <div className="rewards-grid">

            {rewards.length === 0 ? (

              <div className="admin-empty small">

                <div>
                  🎁
                </div>

                <p>
                  Aucune récompense.
                </p>

              </div>

            ) : (

              rewards.map((reward) => (

                <article
                  key={reward.id}
                  className="reward-card"
                >

                  <div className="reward-avatar">
                    👤
                  </div>


                  <div className="reward-main">

                    <strong>
                      {reward.pseudo}
                    </strong>

                    <span>
                      {reward.tournament}
                    </span>

                  </div>


                  <div className="reward-amount">

                    <strong>
                      {reward.amount}
                    </strong>

                    <small>
                      FCFA
                    </small>

                  </div>


                  <div
                    className={
                      `reward-status ${
                        reward.status
                      }`
                    }
                  >
                    {reward.status}
                  </div>


                  {reward.status ===
                    "waiting" && (

                    <button
                      onClick={() =>
                        handleSendReward(
                          reward.id
                        )
                      }
                      className="send-reward-button"
                    >
                      📤 Envoyer
                    </button>

                  )}

                </article>

              ))

            )}

          </div>

        </section>


      </main>

    </div>

  );

}

export default AdminDashboard;