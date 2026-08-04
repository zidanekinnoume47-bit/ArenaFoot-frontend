import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/admin/Sidebar";

const API = import.meta.env.VITE_API_URL;

function AdminMatches() {

    const [matches, setMatches] = useState([]);

    useEffect(() => {
        loadMatches();
    }, []);

    const loadMatches = async () => {

        try {

            const response = await axios.get(`${API}/api/matches`);

            setMatches(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="admin-page">

            <Sidebar />

            <div
                style={{
                    marginLeft: "280px",
                    padding: "20px"
                }}
            >

                <h1>⚽ Gestion des Matchs</h1>

                {
                    matches.length === 0 ?

                    <p>Aucun match disponible.</p>

                    :

                    matches.map((match) => (

                        <div
                            key={match.id}
                            style={{
                                border: "1px solid #ddd",
                                borderRadius: "10px",
                                padding: "15px",
                                marginBottom: "15px"
                            }}
                        >

                            <h3>
                                {match.player_one_name} VS {match.player_two_name}
                            </h3>

                            <p>🏆 {match.tournament_name}</p>

                            <p>📊 Score : {match.score || "Non joué"}</p>

                            <p>👑 Gagnant : {match.winner_name || "En attente"}</p>

                            <p>📌 Statut : {match.status}</p>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default AdminMatches;