import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/tournament.css";

function TournamentCard({ tournament }) {

    const navigate = useNavigate();

    const [playerCount] = useState(
        tournament.players_count || 0
    );

    const playersLimit =
        tournament.players_limit || 16;

    const progress =
        Math.min(
            (playerCount / playersLimit) * 100,
            100
        );

    const handleJoin = () => {

        const storedUser =
            localStorage.getItem("user");

        if (!storedUser) {

            alert(
                "Vous devez avoir un compte ArenaFoot."
            );

            navigate("/login");

            return;
        }

        navigate("/payment", {
            state: {
                tournament
            }
        });
    };

    const isOpen =
        tournament.status === "open";

    const isFull =
        playerCount >= playersLimit;

    return (

        <div className="tournament-card">

            {/* =========================
                HEADER
            ========================= */}

            <div className="tournament-card-header">

                <div className="tournament-icon">
                    🏆
                </div>

                <div>

                    <span className="tournament-label">
                        TOURNOI eFOOTBALL
                    </span>

                    <h2
                        className="tournament-title"
                        onClick={() =>
                            navigate(
                                `/tournaments/${tournament.id}`
                            )
                        }
                    >
                        {tournament.name}
                    </h2>

                </div>

            </div>


            {/* =========================
                STATUS
            ========================= */}

            <div className="tournament-status">

                <span
                    className={
                        isOpen && !isFull
                            ? "status-dot open"
                            : "status-dot full"
                    }
                ></span>

                <span>
                    {isFull
                        ? "Tournoi complet"
                        : isOpen
                            ? "Inscriptions ouvertes"
                            : "Inscriptions fermées"
                    }
                </span>

            </div>


            {/* =========================
                INFOS
            ========================= */}

            <div className="tournament-info-grid">

                <div className="info-box">

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


                <div className="info-box reward-box">

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

            </div>


            {/* =========================
                PLACES
            ========================= */}

            <div className="players-section">

                <div className="players-header">

                    <span>
                        👥 Joueurs inscrits
                    </span>

                    <strong>
                        {playerCount} / {playersLimit}
                    </strong>

                </div>


                <div className="progress-bar">

                    <div
                        className="progress-fill"
                        style={{
                            width: `${progress}%`
                        }}
                    ></div>

                </div>


                <p className="places-text">

                    {isFull
                        ? "Toutes les places sont prises."
                        : `${playersLimit - playerCount} place(s) encore disponible(s)`
                    }

                </p>

            </div>


            {/* =========================
                ACTIONS
            ========================= */}

            <div className="tournament-actions">

                <button
                    className="details-btn"
                    onClick={() =>
                        navigate(
                            `/tournaments/${tournament.id}`
                        )
                    }
                >
                    📋 Voir le tournoi
                </button>


                {isOpen && !isFull && (

                    <button
                        className="participate-btn"
                        onClick={handleJoin}
                    >
                        ⚡ Participer maintenant
                    </button>

                )}


                <button
                    className="bracket-btn"
                    onClick={() =>
                        navigate(
                            `/tournaments/${tournament.id}/bracket`
                        )
                    }
                >
                    🏆 Voir le bracket
                </button>

            </div>


            {/* =========================
                FOOTER
            ========================= */}

            <div className="tournament-footer">

                <span>
                    🎮 eFootball
                </span>

                <span>
                    🔒 Paiement sécurisé
                </span>

            </div>

        </div>
    );
}

export default TournamentCard;