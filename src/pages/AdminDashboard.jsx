import React from 'react';

import {useEffect,useState} from "react";
import {
    getPlayers,
    getTournaments,
    deleteTournament,
    getRewards,
    sendReward,
    getPayments
} from "../service/adminService";

import Sidebar from "../components/admin/Sidebar";
import DashboardCards from "../components/admin/DashboardCards";

function AdminDashboard(){


const [players,setPlayers]=useState([]);

const [tournaments,setTournaments]=useState([]);

const [rewards, setRewards] = useState([]);
const [payments, setPayments] = useState([]);


useEffect(() => {


    getPayments().then(data => {

    console.log("PAYMENTS :", data);

    setPayments(Array.isArray(data) ? data : []);

     });


    getRewards().then(data => {

    console.log("REWARDS :", data);

    setRewards(Array.isArray(data) ? data : []);

    });


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


const handleSendReward = async (id) => {

    const data = await sendReward(id);

    alert(data.message);

    const list = await getRewards();

    setRewards(list);

};

return(

<div className="admin-page">

    <Sidebar />

    <div style={{marginLeft:"280px",padding:"20px"}}>

        <h1>👑 ArenaFoot Admin</h1>

        <DashboardCards
            players={players}
            tournaments={tournaments}
            payments={payments}
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
}<h2>🏆 Récompenses</h2>

{
    rewards.map((reward) => (

        <div
            key={reward.id}
            style={{
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "10px",
                borderRadius: "8px"
            }}
        >

            <p>👤 {reward.pseudo}</p>

            <p>🏆 {reward.tournament}</p>

            <p>💰 {reward.amount} FCFA</p>

            <p>📱 {reward.phone}</p>

            <p>📌 {reward.status}</p>

            {
                reward.status === "waiting" && (

                    <button
                        onClick={() => handleSendReward(reward.id)}
                    >
                        📤 Envoyer
                    </button>

                )
            }

        </div>

    ))
}

    </div>

</div>

);


}


export default AdminDashboard;