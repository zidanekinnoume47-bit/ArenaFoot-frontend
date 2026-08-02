import React from 'react';

import {useEffect,useState} from "react";
import {
getPlayers,
getTournaments
} from "../service/adminService.js";

import Sidebar from "../components/admin/Sidebar";
import DashboardCards from "../components/admin/DashboardCards";

function AdminDashboard(){


const [players,setPlayers]=useState([]);

const [tournaments,setTournaments]=useState([]);


useEffect(() => {

    getPlayers().then(data => {

        console.log("PLAYERS :", data);

        setPlayers(data);

    });

    getTournaments().then(data => {

        console.log("TOURNAMENTS :", data);

        setTournaments(data);

    });

}, []);



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
            tournaments.map((t)=>(
                <div key={t.id}>

                    <h3>{t.name}</h3>

                    <p>Participation : {t.entry_fee} FCFA</p>

                    <p>Récompense : {t.reward} FCFA</p>

                </div>
            ))
        }

    </div>

</div>

);


}


export default AdminDashboard;