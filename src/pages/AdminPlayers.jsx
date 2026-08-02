import React, { useEffect, useState } from "react";
import Sidebar from "../components/admin/Sidebar";
import {
    getPlayers,
    getPlayer,
    banPlayer,
    deletePlayer
} from "../service/adminService";
import "../styles/admin.css";


function AdminPlayers() {

    const [players, setPlayers] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {
    getPlayers().then(data => {
        console.log("PLAYERS :", data);
        setPlayers(data);
    });
}, []);



    
   const handleView = async (id) => {

    console.log("ID :", id);

    const player = await getPlayer(id);

    console.log(player);

};



const handleBan = async (id) => {

    if (!window.confirm("Bannir ce joueur ?")) return;

    const data = await banPlayer(id);

    alert(data.message);

    getPlayers().then(data => setPlayers(data));

};

const handleDelete = async (id) => {

    if (!window.confirm("Supprimer définitivement ce joueur ?")) return;

    const data = await deletePlayer(id);

    alert(data.message);

    getPlayers().then(data => setPlayers(data));

};


    return (

        <div className="admin-page">

            <Sidebar />

            

            <div className="admin-content">

                <h1>👥 Gestion des joueurs</h1>

                <input
                    type="text"
                    placeholder="Rechercher un joueur..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="admin-search"
                />

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
                            players
                        .filter(player =>
                            player.name?.toLowerCase().includes(search.toLowerCase()) ||
                            player.pseudo?.toLowerCase().includes(search.toLowerCase()) ||
                            player.email?.toLowerCase().includes(search.toLowerCase())
                        )
                        .map(player => (

                                <tr key={player.id}>

                                    <td>{player.name}</td>
                                    <td>{player.pseudo}</td>
                                    <td>{player.email}</td>
                                    <td>{player.phone}</td>
                                    <td>{player.role}</td>

                                    <td>

                                        <button onClick={() => handleView(player.id)}>
                                            👁 Voir
                                        </button>

                                        <button>✏ Modifier</button>

                                        <button onClick={() => handleBan(player.id)}>
                                            🚫 Bannir
                                        </button>

                                        <button onClick={() => handleDelete(player.id)}>
                                            🗑 Supprimer
                                        </button>

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