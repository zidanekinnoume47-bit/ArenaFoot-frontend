import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import "../styles/tournamentDetails.css";

const API = import.meta.env.VITE_API_URL;

function TournamentDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [players, setPlayers] = useState([]);
    const [tournament, setTournament] = useState(null);
    const [champion, setChampion] = useState(null);

    useEffect(() => {

        // ==============================
        // TOURNOI
        // ==============================

        axios
            .get(`${API}/api/tournaments/${id}`)
            .then((res) => {

                console.log(
                    "Tournoi :",
                    res.data
                );

                setTournament(res.data);


                // ==============================
                // CHAMPION
                // ==============================

                if (res.data.winner_id) {

                    axios
                        .get(
                            `${API}/api/users/${res.data.winner_id}`
                        )
                        .then((response) => {

                            console.log(
                                "Champion :",
                                response.data
                            );

                            setChampion(
                                response.data
                            );

                        })
                        .catch((err) => {

                            console.log(
                                "Erreur champion :",
                                err
                            );

                        });

                }

            })
            .catch((err) => {

                console.log(
                    "Erreur tournoi :",
                    err
                );

            });


        // ==============================
        // PARTICIPANTS
        // ==============================

        axios
            .get(
                `${API}/api/tournaments/${id}/players`
            )
            .then((res) => {

                console.log(
                    "Participants :",
                    res.data
                );

                setPlayers(res.data);

            })
            .catch((err) => {

                console.log(
                    "Erreur participants :",
                    err
                );

            });

    }, [id]);


    // ==============================
    // CHARGEMENT
    // ==============================

    if (!tournament) {

        return (

            <div className="details-loading">

                <div className="loading-spinner">
                    ⚽
                </div>

                <h2>
                    Chargement du tournoi...
                </h2>

            </div>

        );

    }


    const playersLimit =
        tournament.players_limit || 16;

    const playerCount =
        tournament.players_count || players.length;

    const progress =
        Math.min(
            (playerCount / playersLimit) * 100,
            100
        );


    const isFinished =
        tournament.status === "finished";


    return (

        <div className="details-page">


            {/* =================================
                HEADER
            ================================= */}

            <section className="details-hero">

                <div className="details-glow"></div>

                <span className="details-badge">
                    🏆 ARENAFOOT • eFOOTBALL
                </span>

                <h1>
                    {tournament.name}
                </h1>

                <p>
                    Affronte les meilleurs joueurs
                    et tente de devenir champion.
                </p>


                <div
                    className={
                        isFinished
                            ? "details-status finished"
                            : "details-status open"
                    }
                >

                    <span></span>

                    {isFinished
                        ? "Tournoi terminé"
                        : "Tournoi en cours"
                    }

                </div>

            </section>


            {/* =================================
                INFORMATIONS
            ================================= */}

            <section className="details-content">


                <div className="details-stats">


                    <div className="detail-stat">

                        <span>
                            💰
                        </span>

                        <small>
                            Participation
                        </small>

                        <strong>
                            {tournament.entry_fee} FCFA
                        </strong>

                    </div>


                    <div className="detail-stat reward">

                        <span>
                            🏆
                        </span>

                        <small>
                            Récompense
                        </small>

                        <strong>
                            {tournament.reward} FCFA
                        </strong>

                    </div>


                    <div className="detail-stat">

                        <span>
                            👥
                        </span>

                        <small>
                            Joueurs
                        </small>

                        <strong>
                            {playerCount} / {playersLimit}
                        </strong>

                    </div>

                </div>


                {/* =================================
                    PROGRESSION
                ================================= */}

                <div className="players-progress">

                    <div className="progress-header">

                        <span>
                            Places occupées
                        </span>

                        <strong>
                            {playerCount}/{playersLimit}
                        </strong>

                    </div>


                    <div className="progress-track">

                        <div
                            className="progress-value"
                            style={{
                                width:
                                    `${progress}%`
                            }}
                        ></div>

                    </div>


                    <p>

                        {playerCount >= playersLimit

                            ? "Toutes les places sont prises."

                            : `${playersLimit - playerCount} place(s) restante(s)`
                        }

                    </p>

                </div>


                {/* =================================
                    CHAMPION
                ================================= */}

                {champion && (

                    <div className="champion-box">

                        <div className="champion-rays"></div>

                        <div className="champion-icon">
                            🏆
                        </div>

                        <span>
                            CHAMPION DU TOURNOI
                        </span>

                        <h2>
                            👑{" "}
                            {champion.pseudo ||
                                champion.name}
                        </h2>

                        <p>
                            Félicitations pour cette
                            incroyable victoire !
                        </p>

                    </div>

                )}


                {/* =================================
                    PARTICIPANTS
                ================================= */}

                <section className="participants-section">

                    <div className="participants-header">

                        <div>

                            <span>
                                👥 PARTICIPANTS
                            </span>

                            <h2>
                                Les joueurs de l'arène
                            </h2>

                        </div>

                        <strong>
                            {players.length}
                        </strong>

                    </div>


                    {players.length > 0 ? (

                        <div className="players-grid">

                            {players.map(
                                (player, index) => (

                                    <div
                                        className="participant-card"
                                        key={player.id}
                                    >

                                        <div className="participant-number">

                                            #{index + 1}

                                        </div>


                                        <div className="participant-avatar">

                                            {player.pseudo
                                                ?.charAt(0)
                                                ?.toUpperCase() ||
                                                "?"}

                                        </div>


                                        <div className="participant-info">

                                            <strong>
                                                {player.pseudo}
                                            </strong>

                                            <span>
                                                Joueur ArenaFoot
                                            </span>

                                        </div>


                                        <div className="participant-ball">
                                            ⚽
                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    ) : (

                        <div className="no-players">

                            <span>
                                🎮
                            </span>

                            <p>
                                Aucun participant pour
                                le moment.
                            </p>

                        </div>

                    )}

                </section>


                {/* =================================
                    ACTIONS
                ================================= */}

                <div className="details-actions">

                    <button
                        className="bracket-btn"
                        onClick={() =>
                            navigate(
                                `/tournaments/${id}/bracket`
                            )
                        }
                    >
                        🏆 Voir le bracket
                    </button>


                    <button
                        className="back-btn"
                        onClick={() =>
                            navigate("/tournaments")
                        }
                    >
                        ← Retour aux tournois
                    </button>

                </div>

            </section>

        </div>

    );

}

export default TournamentDetails;