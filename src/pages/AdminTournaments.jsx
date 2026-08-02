import React, { useEffect, useState } from "react";
import Sidebar from "../components/admin/Sidebar";
import {
    getTournaments,
    deleteTournament,
    getTournamentPlayers
} from "../service/adminService";

function AdminTournaments() {

    const [tournaments, setTournaments] = useState([]);
    const [players, setPlayers] = useState([]);
    const [selectedTournament, setSelectedTournament] = useState(null);

    useEffect(() => {
        loadTournaments();
    }, []);

    const loadTournaments = async () => {
        const data = await getTournaments();
        setTournaments(Array.isArray(data) ? data : []);
    };

    const handleDelete = async (id) => {

        if (!window.confirm("Supprimer ce tournoi ?")) return;

        const data = await deleteTournament(id);

        alert(data.message);

        loadTournaments();

    };

    const handlePlayers = async (id) => {

    console.log("Tournoi :", id);

    const data = await getTournamentPlayers(id);

    console.log("JOUEURS :", data);

    setPlayers(data);

    setSelectedTournament(id);

};

    return (

        <div className="admin-page">

            <Sidebar />

            <div style={{ marginLeft: "280px", padding: "20px" }}>

                <h1>🏆 Gestion des tournois</h1>

                {
    tournaments.map((t) => (
        <div
            key={t.id}
            style={{
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "8px"
            }}
        >
            <h3>{t.name}</h3>

            <p>Participation : {t.entry_fee} FCFA</p>

            <p>Récompense : {t.reward} FCFA</p>

            <button onClick={() => handlePlayers(t.id)}>
                👥 Participants
            </button>

            <button>🏆 Bracket</button>

            <button>✏ Modifier</button>

            <button onClick={() => handleDelete(t.id)}>
                🗑 Supprimer
            </button>

            {
    selectedTournament === t.id && (

        <div style={{ marginTop: "20px" }}>

            <h3>Participants</h3>

            <table className="admin-table">

                <thead>

                    <tr>

                        <th>Nom</th>
                        <th>Pseudo</th>
                        <th>Téléphone</th>
                        <th>Paiement</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        players.map((p) => (

                            <tr key={p.id}>

                                <td>{p.name}</td>

                                <td>{p.pseudo}</td>

                                <td>{p.phone}</td>

                                <td>{p.payment_status}</td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>

    )
}

        </div>
    ))
}

            </div>

        </div>

    );

}

export default AdminTournaments;