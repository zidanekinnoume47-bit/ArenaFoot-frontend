import React, { useEffect, useState } from "react";
import Sidebar from "../components/admin/Sidebar";
import { getPlayers } from "../service/adminService";
import "../styles/admin.css";

function AdminPlayers() {

    const [players, setPlayers] = useState([]);

    useEffect(() => {
        getPlayers().then(data => setPlayers(data));
    }, []);

    return (

        <div className="admin-page">

            <Sidebar />

            <div className="admin-content">

                <h1>👥 Gestion des joueurs</h1>

                <table className="admin-table">

                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Pseudo</th>
                            <th>Email</th>
                            <th>Téléphone</th>
                            <th>Rôle</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {
                            players.map(player => (

                                <tr key={player.id}>

                                    <td>{player.name}</td>
                                    <td>{player.pseudo}</td>
                                    <td>{player.email}</td>
                                    <td>{player.phone}</td>
                                    <td>{player.role}</td>

                                    <td>

                                        <button>👁 Voir</button>

                                        <button>✏ Modifier</button>

                                        <button>🚫 Bannir</button>

                                        <button>🗑 Supprimer</button>

                                    </td>

                                </tr>

                            ))
                        }

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default AdminPlayers;