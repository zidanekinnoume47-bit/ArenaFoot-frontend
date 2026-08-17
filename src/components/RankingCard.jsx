import React, { useEffect, useState } from "react";
import axios from "axios";

import "../styles/ranking.css";

const API = import.meta.env.VITE_API_URL;

function RankingCard() {

    const [players, setPlayers] = useState([]);

    useEffect(() => {

        axios
            .get(`${API}/api/users/ranking`)
            .then((res) => {

                setPlayers(
                    Array.isArray(res.data)
                        ? res.data.slice(0, 3)
                        : []
                );

            })
            .catch((err) => {

                console.log(
                    "ERREUR CLASSEMENT :",
                    err
                );

            });

    }, []);


    const medals = [
        "🥇",
        "🥈",
        "🥉"
    ];


    return (

        <div className="ranking-card">

            {/* =========================
                HEADER
            ========================= */}

            <div className="ranking-header">

                <div className="ranking-icon">
                    🏆
                </div>

                <div>

                    <span className="ranking-label">
                        ARENAFOOT
                    </span>

                    <h2>
                        Classement
                    </h2>

                </div>

            </div>


            {/* =========================
                PODIUM
            ========================= */}

            <div className="ranking-subtitle">

                <span>
                    🔥
                </span>

                <p>
                    Les meilleurs joueurs de l'arène
                </p>

            </div>


            {/* =========================
                JOUEURS
            ========================= */}

            <div className="players-list">

                {players.length === 0 ? (

                    <div className="ranking-empty">

                        <span>
                            🎮
                        </span>

                        <p>
                            Aucun classement disponible
                        </p>

                    </div>

                ) : (

                    players.map((player, index) => (

                        <div
                            className={`ranking-player rank-${index + 1}`}
                            key={player.id}
                        >

                            <div className="player-rank">

                                <span className="medal">
                                    {medals[index]}
                                </span>

                                <span className="rank-number">
                                    #{index + 1}
                                </span>

                            </div>


                            <div className="player-avatar">

                                {player.pseudo
                                    ?.charAt(0)
                                    ?.toUpperCase() || "?"}

                            </div>


                            <div className="player-info">

                                <strong>
                                    {player.pseudo}
                                </strong>

                                <span>
                                    Joueur ArenaFoot
                                </span>

                            </div>


                            <div className="player-wins">

                                <strong>
                                    {player.wins || 0}
                                </strong>

                                <span>
                                    victoires
                                </span>

                            </div>

                        </div>

                    ))

                )}

            </div>


            {/* =========================
                FOOTER
            ========================= */}

            <div className="ranking-footer">

                <span>
                    ⚡
                </span>

                <p>
                    Gagne tes matchs pour grimper
                    dans le classement.
                </p>

            </div>

        </div>

    );

}

export default RankingCard;