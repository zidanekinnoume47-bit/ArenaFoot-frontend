import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/tournament.css";

function TournamentCard({ tournament }) {

    const navigate = useNavigate();

    const [playerCount] = useState(
        tournament.players_count || 0
    );

    console.log("ID DU TOURNOI CARD :", tournament.id);

    const handleJoin = () => {

        const storedUser = localStorage.getItem("user");

        if (!storedUser) {

            alert("Vous devez avoir un compte ArenaFoot.");

            navigate("/login");

            return;

        }

        navigate("/payment", {
            state: {
                tournament
            }
        });

    };

    return (

        <div className="tournament-card">

            <h2
                className="tournament-title"
                onClick={() => navigate(`/tournaments/${tournament.id}`)}
            >
                🏆 {tournament.name}
            </h2>

            <p>
                💰 Participation :
                <strong> {tournament.entry_fee} FCFA</strong>
            </p>

            <p>
                🎁 Récompense :
                <strong> {tournament.reward} FCFA</strong>
            </p>

            <p>
                👥 Places :
                {playerCount} / {tournament.players_limit || 16}
            </p>

            <button
                className="details-btn"
                onClick={() => navigate(`/tournaments/${tournament.id}`)}
            >
                📋 Voir le tournoi
            </button>

            {
                tournament.status !== "finished" && (

                    <button
                        className="participate-btn"
                        onClick={handleJoin}
                    >
                        Participer
                    </button>

                )
            }

            <button
                className="bracket-btn"
                onClick={() => navigate(`/tournaments/${tournament.id}/bracket`)}
            >
                Voir le bracket
            </button>

        </div>

    );

}

export default TournamentCard;