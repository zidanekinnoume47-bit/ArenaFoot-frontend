import React from 'react';

import {useEffect,useState} from "react";
import {
    getPlayers,
    getTournaments,
    deleteTournament
} from "../service/adminService";

import Sidebar from "../components/admin/Sidebar";
import DashboardCards from "../components/admin/DashboardCards";

function AdminDashboard(){


const [players,setPlayers]=useState([]);

const [tournaments,setTournaments]=useState([]);


useEffect(() => {




    getPlayers().then(data => {

        console.log("PLAYERS :", data);

       setPlayers(Array.isArray(data) ? data : []);

    });

    getTournaments().then(data => {

        console.log("TOURNAMENTS :", data);

       setTournaments(Array.isArray(data) ? data : []);

    });

}, []);

const handleDeleteTournament = async (id) => {

    if (!window.confirm("Supprimer ce tournoi ?")) return;

    const data = await deleteTournament(id);

    alert(data.message);

    const list = await getTournaments();

    setTournaments(list);

};

return(

<div className="admin-page">

    <Sidebar />

    <div style={{marginLeft:"280px",padding:"20px"}}>

        <h1>👑 ArenaFoot Admin</h1>

        <DashboardCards
            players={players}
            tournaments={tournaments}
        />

        <h2>Joueurs</h2>

        <p>
            Nombre de joueurs : {players.length}
        </p>

        <h2>Tournois</h2>

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

            <button>👥 Participants</button>

            <button>🏆 Bracket</button>

            <button>✏ Modifier</button>

            <button onClick={() => handleDeleteTournament(t.id)}>
                🗑 Supprimer
            </button>

        </div>
    ))
}

    </div>

</div>

);


}


export default AdminDashboard;