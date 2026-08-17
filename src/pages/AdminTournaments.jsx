import React, { useEffect, useState } from "react";
import Sidebar from "../components/admin/Sidebar";

import {
  getTournaments,
  deleteTournament,
  getTournamentPlayers,
  createTestPlayers,
  generateBracket
} from "../service/adminService";

import "../styles/admin.css";

function AdminTournaments() {

  const [tournaments, setTournaments] = useState([]);
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);

  const [selectedTournament, setSelectedTournament] = useState(null);
  const [viewMode, setViewMode] = useState(null);

  const [loadingTournamentId, setLoadingTournamentId] = useState(null);
  const [bracketLoadingId, setBracketLoadingId] = useState(null);

  const [loading, setLoading] = useState(true);


  useEffect(() => {
    loadTournaments();
  }, []);


  const loadTournaments = async () => {

    try {

      setLoading(true);

      const data = await getTournaments();

      setTournaments(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {

      console.error(
        "Erreur chargement tournois :",
        error
      );

    } finally {

      setLoading(false);

    }

  };


  const handleDelete = async (id) => {

    if (
      !window.confirm(
        "Supprimer définitivement ce tournoi ?"
      )
    ) {
      return;
    }


    try {

      const data =
        await deleteTournament(id);

      alert(
        data.message ||
        "Tournoi supprimé."
      );

      if (selectedTournament === id) {

        setSelectedTournament(null);
        setViewMode(null);
        setPlayers([]);
        setMatches([]);

      }

      await loadTournaments();

    } catch (error) {

      console.error(error);

      alert(
        "Impossible de supprimer le tournoi."
      );

    }

  };


  const handlePlayers = async (id) => {

    try {

      const data =
        await getTournamentPlayers(id);

      setPlayers(
        Array.isArray(data)
          ? data
          : []
      );

      setSelectedTournament(id);

      setViewMode("players");

    } catch (error) {

      console.error(
        "Erreur participants :",
        error
      );

      alert(
        "Impossible de charger les participants."
      );

    }

  };


  const handleShowBracket = async (id) => {

    try {

      const token =
        localStorage.getItem("adminToken") ||
        localStorage.getItem("token");


      const response = await fetch(
        `https://arenafoot-backend-production.up.railway.app/api/admin/tournament/${id}/bracket`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );


      if (!response.ok) {

        throw new Error(
          "Erreur récupération bracket"
        );

      }


      const data =
        await response.json();


      setMatches(
        Array.isArray(data)
          ? data
          : []
      );

      setSelectedTournament(id);

      setViewMode("bracket");

    } catch (error) {

      console.error(
        "Erreur chargement bracket :",
        error
      );

      alert(
        "Impossible de charger le bracket."
      );

    }

  };


  const handleAddTestPlayers = async (
    tournamentId
  ) => {

    if (
      !window.confirm(
        "Simuler l'ajout de 15 joueurs test payés ?"
      )
    ) {
      return;
    }


    setLoadingTournamentId(
      tournamentId
    );


    try {

      const res =
        await createTestPlayers(
          tournamentId
        );


      alert(
        res.message ||
        "Joueurs test ajoutés !"
      );


      await handlePlayers(
        tournamentId
      );

      await loadTournaments();

    } catch (error) {

      console.error(
        "Erreur simulation :",
        error
      );

      alert(
        "Une erreur est survenue."
      );

    } finally {

      setLoadingTournamentId(null);

    }

  };


  const handleGenerateBracket = async (
    tournamentId
  ) => {

    if (
      !window.confirm(
        "Générer le tirage au sort et les matchs du tournoi ?"
      )
    ) {
      return;
    }


    setBracketLoadingId(
      tournamentId
    );


    try {

      const res =
        await generateBracket(
          tournamentId
        );


      alert(
        res.message ||
        "Bracket généré avec succès !"
      );


      await handleShowBracket(
        tournamentId
      );

      await loadTournaments();

    } catch (error) {

      console.error(
        "Erreur génération bracket :",
        error
      );

      alert(
        "Impossible de générer le bracket."
      );

    } finally {

      setBracketLoadingId(null);

    }

  };


  const closePanel = () => {

    setSelectedTournament(null);

    setViewMode(null);

    setPlayers([]);

    setMatches([]);

  };


  const selectedTournamentData =
    tournaments.find(
      t => t.id === selectedTournament
    );


  if (loading) {

    return (

      <div className="admin-page">

        <Sidebar />

        <main className="admin-content tournaments-admin-page">

          <div className="tournaments-loading">

            <div className="loading-spinner"></div>

            <p>
              Chargement des tournois...
            </p>

          </div>

        </main>

      </div>

    );

  }


  return (

    <div className="admin-page">

      <Sidebar />


      <main className="admin-content tournaments-admin-page">


        {/* HEADER */}

        <div className="tournaments-admin-header">

          <div>

            <div className="admin-eyebrow">
              ARENAFOOT TOURNAMENT CONTROL
            </div>

            <h1>
              🏆 Gestion des tournois
            </h1>

            <p>
              Gérez les inscriptions,
              participants et brackets.
            </p>

          </div>


          <button
            className="tournament-refresh-button"
            onClick={loadTournaments}
          >
            ↻ Actualiser
          </button>

        </div>


        {/* STATS */}

        <div className="tournament-admin-stats">


          <div className="tournament-stat">

            <div className="tournament-stat-icon blue">
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


          <div className="tournament-stat">

            <div className="tournament-stat-icon green">
              🟢
            </div>

            <div>

              <span>
                Ouverts
              </span>

              <strong>
                {
                  tournaments.filter(
                    t => t.status === "open"
                  ).length
                }
              </strong>

            </div>

          </div>


          <div className="tournament-stat">

            <div className="tournament-stat-icon orange">
              👥
            </div>

            <div>

              <span>
                Capacité totale
              </span>

              <strong>
                {
                  tournaments.reduce(
                    (total, t) =>
                      total +
                      Number(
                        t.players_limit || 0
                      ),
                    0
                  )
                }
              </strong>

            </div>

          </div>


          <div className="tournament-stat">

            <div className="tournament-stat-icon purple">
              💰
            </div>

            <div>

              <span>
                Participation moyenne
              </span>

              <strong>
                {
                  tournaments.length
                    ? Math.round(
                        tournaments.reduce(
                          (total, t) =>
                            total +
                            Number(
                              t.entry_fee || 0
                            ),
                          0
                        ) /
                        tournaments.length
                      )
                    : 0
                }
                <small> FCFA</small>
              </strong>

            </div>

          </div>

        </div>


        {/* EMPTY */}

        {tournaments.length === 0 ? (

          <div className="tournaments-empty">

            <div className="tournaments-empty-icon">
              🏆
            </div>

            <h2>
              Aucun tournoi
            </h2>

            <p>
              Aucun tournoi n'est actuellement
              disponible.
            </p>

          </div>

        ) : (

          <div className="tournaments-admin-grid">

            {tournaments.map(
              (tournament, index) => {

                const limit =
                  Number(
                    tournament.players_limit ||
                    16
                  );


                const isSelected =
                  selectedTournament ===
                  tournament.id;


                const isFull =
                  tournament.status === "full";


                const statusClass =
                  tournament.status ===
                  "open"
                    ? "open"
                    : tournament.status ===
                      "finished"
                      ? "finished"
                      : isFull
                        ? "full"
                        : "pending";


                return (

                  <article
                    key={tournament.id}
                    className={
                      `tournament-admin-premium-card ${
                        isSelected
                          ? "selected"
                          : ""
                      }`
                    }
                    style={{
                      animationDelay:
                        `${index * 60}ms`
                    }}
                  >


                    {/* TOP */}

                    <div className="tournament-card-top">

                      <div className="tournament-card-title">

                        <div className="tournament-mini-icon">
                          🏆
                        </div>

                        <div>

                          <h2>
                            {tournament.name}
                          </h2>

                          <span>
                            Tournoi #{tournament.id}
                          </span>

                        </div>

                      </div>


                      <span
                        className={
                          `tournament-status-badge ${statusClass}`
                        }
                      >

                        {tournament.status ===
                        "open"
                          ? "🟢 Ouvert"
                          : tournament.status ===
                            "finished"
                            ? "🏁 Terminé"
                            : isFull
                              ? "🔴 Complet"
                              : "🟡 En attente"}

                      </span>

                    </div>


                    {/* DESCRIPTION */}

                    {tournament.description && (

                      <p className="tournament-description">

                        {tournament.description}

                      </p>

                    )}


                    {/* MONEY */}

                    <div className="tournament-money-grid">


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

                        <strong className="reward">
                          {tournament.reward}
                          <small>
                            FCFA
                          </small>
                        </strong>

                      </div>

                    </div>


                    {/* PROGRESSION */}

                    <div className="tournament-progress-area">

                      <div className="tournament-progress-header">

                        <span>
                          👥 Participants
                        </span>

                        <strong>
                          {isSelected &&
                          viewMode ===
                            "players"
                            ? players.length
                            : tournament.players_count ||
                              0}
                          {" / "}
                          {limit}
                        </strong>

                      </div>


                      <div className="tournament-progress">

                        <span
                          style={{
                            width:
                              `${
                                Math.min(
                                  100,
                                  (
                                    (
                                      isSelected &&
                                      viewMode ===
                                        "players"
                                    )
                                      ? players.length
                                      : tournament.players_count ||
                                        0
                                  ) /
                                  limit *
                                  100
                                )
                              }%`
                          }}
                        />

                      </div>

                    </div>


                    {/* ACTIONS */}

                    <div className="tournament-premium-actions">


                      <button
                        className="action-blue"
                        onClick={() =>
                          handlePlayers(
                            tournament.id
                          )
                        }
                      >
                        👥 Participants
                      </button>


                      <button
                        className="action-purple"
                        onClick={() =>
                          handleShowBracket(
                            tournament.id
                          )
                        }
                      >
                        🌳 Bracket
                      </button>


                      <button
                        className="action-green"
                        onClick={() =>
                          handleGenerateBracket(
                            tournament.id
                          )
                        }
                        disabled={
                          bracketLoadingId ===
                          tournament.id
                        }
                      >
                        {
                          bracketLoadingId ===
                          tournament.id
                            ? "⏳ Tirage..."
                            : "🏆 Générer"
                        }
                      </button>


                      <button
                        className="action-violet"
                        onClick={() =>
                          handleAddTestPlayers(
                            tournament.id
                          )
                        }
                        disabled={
                          loadingTournamentId ===
                          tournament.id
                        }
                      >
                        {
                          loadingTournamentId ===
                          tournament.id
                            ? "⏳..."
                            : "🧪 +15 Test"
                        }
                      </button>


                      <button
                        className="action-edit"
                      >
                        ✏️ Modifier
                      </button>


                      <button
                        className="action-delete"
                        onClick={() =>
                          handleDelete(
                            tournament.id
                          )
                        }
                      >
                        🗑️ Supprimer
                      </button>

                    </div>


                  </article>

                );

              }
            )}

          </div>

        )}


        {/* =================================
            DETAIL PANEL
        ================================= */}

        {selectedTournament && (

          <div
            className="tournament-detail-overlay"
            onClick={closePanel}
          >

            <section
              className="tournament-detail-panel"
              onClick={(e) =>
                e.stopPropagation()
              }
            >


              <button
                className="tournament-detail-close"
                onClick={closePanel}
              >
                ✕
              </button>


              {/* PANEL HEADER */}

              <div className="tournament-detail-header">

                <div>

                  <div className="admin-eyebrow">
                    TOURNAMENT CONTROL
                  </div>

                  <h2>
                    🏆{" "}
                    {
                      selectedTournamentData?.name
                    }
                  </h2>

                </div>


                <div className="tournament-detail-switch">

                  <button
                    className={
                      viewMode ===
                      "players"
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      handlePlayers(
                        selectedTournament
                      )
                    }
                  >
                    👥 Participants
                  </button>


                  <button
                    className={
                      viewMode ===
                      "bracket"
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      handleShowBracket(
                        selectedTournament
                      )
                    }
                  >
                    🌳 Bracket
                  </button>

                </div>

              </div>


              {/* PARTICIPANTS */}

              {viewMode === "players" && (

                <div className="tournament-detail-content">


                  <div className="detail-summary">

                    <div>

                      <span>
                        Participants
                      </span>

                      <strong>
                        {players.length}
                        /
                        {
                          selectedTournamentData?.players_limit ||
                          16
                        }
                      </strong>

                    </div>


                    <div>

                      <span>
                        Payés
                      </span>

                      <strong className="paid-number">

                        {
                          players.filter(
                            p =>
                              p.payment_status ===
                              "paid"
                          ).length
                        }

                      </strong>

                    </div>


                    <div>

                      <span>
                        En attente
                      </span>

                      <strong>

                        {
                          players.filter(
                            p =>
                              p.payment_status !==
                              "paid"
                          ).length
                        }

                      </strong>

                    </div>

                  </div>


                  <div className="participants-list">


                    {players.length === 0 ? (

                      <div className="detail-empty">

                        <span>
                          👥
                        </span>

                        <p>
                          Aucun participant.
                        </p>

                      </div>

                    ) : (

                      players.map(
                        (player, index) => (

                          <div
                            key={player.id}
                            className="participant-row"
                            style={{
                              animationDelay:
                                `${index * 35}ms`
                            }}
                          >

                            <div className="participant-number">
                              {index + 1}
                            </div>


                            <div className="participant-avatar">

                              {
                                player.name
                                  ?.charAt(0)
                                  ?.toUpperCase()
                                || "?"
                              }

                            </div>


                            <div className="participant-info">

                              <strong>
                                {player.name}
                              </strong>

                              <span>
                                @{player.pseudo}
                              </span>

                            </div>


                            <div className="participant-phone">
                              📱 {player.phone}
                            </div>


                            <span
                              className={
                                `participant-payment ${
                                  player.payment_status ===
                                  "paid"
                                    ? "paid"
                                    : "waiting"
                                }`
                              }
                            >

                              {
                                player.payment_status ===
                                "paid"
                                  ? "✓ Payé"
                                  : "⏳ En attente"
                              }

                            </span>

                          </div>

                        )
                      )

                    )}

                  </div>

                </div>

              )}


              {/* BRACKET */}

              {viewMode === "bracket" && (

                <div className="tournament-detail-content">


                  <div className="bracket-header">

                    <div>

                      <h3>
                        🌳 Arbre du tournoi
                      </h3>

                      <p>
                        {matches.length}
                        {" "}
                        matchs générés
                      </p>

                    </div>


                    <button
                      className="generate-bracket-detail"
                      onClick={() =>
                        handleGenerateBracket(
                          selectedTournament
                        )
                      }
                      disabled={
                        bracketLoadingId ===
                        selectedTournament
                      }
                    >
                      {
                        bracketLoadingId ===
                        selectedTournament
                          ? "⏳ Génération..."
                          : "🏆 Générer le bracket"
                      }
                    </button>

                  </div>


                  {matches.length === 0 ? (

                    <div className="detail-empty">

                      <span>
                        🌳
                      </span>

                      <h3>
                        Aucun match généré
                      </h3>

                      <p>
                        Génère le bracket
                        pour commencer
                        la compétition.
                      </p>

                    </div>

                  ) : (

                    <div className="admin-bracket-grid">

                      {matches.map(
                        (match, index) => (

                          <div
                            key={match.id}
                            className="admin-bracket-match"
                            style={{
                              animationDelay:
                                `${index * 45}ms`
                            }}
                          >

                            <div className="bracket-match-top">

                              <span>
                                MATCH {index + 1}
                              </span>

                              <span>
                                {
                                  match.status ===
                                  "pending"
                                    ? "⏳"
                                    : "⚽"
                                }
                              </span>

                            </div>


                            <div className="bracket-player">

                              <span>
                                {
                                  match.player_one_pseudo ||
                                  "En attente"
                                }
                              </span>

                              <strong>
                                {
                                  match.player_one_pseudo
                                    ? "?"
                                    : "-"
                                }
                              </strong>

                            </div>


                            <div className="bracket-vs">
                              VS
                            </div>


                            <div className="bracket-player">

                              <span>
                                {
                                  match.player_two_pseudo ||
                                  "En attente"
                                }
                              </span>

                              <strong>
                                {
                                  match.player_two_pseudo
                                    ? "?"
                                    : "-"
                                }
                              </strong>

                            </div>


                            <div className="bracket-match-status">

                              📌{" "}
                              {
                                match.status ===
                                "pending"
                                  ? "En attente"
                                  : match.status
                              }

                            </div>

                          </div>

                        )
                      )}

                    </div>

                  )}

                </div>

              )}

            </section>

          </div>

        )}

      </main>

    </div>

  );

}

export default AdminTournaments;