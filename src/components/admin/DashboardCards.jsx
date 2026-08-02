import React from "react";
import "../../styles/admin.css";

function DashboardCards({ players, tournaments }) {

    return (

        <div className="cards">

            <div className="card">
                <h3>👥 Joueurs</h3>
                <h1>{players.length}</h1>
            </div>

            <div className="card">
                <h3>🏆 Tournois</h3>
                <h1>{tournaments.length}</h1>
            </div>

            <div className="card">
                <h3>💳 Paiements</h3>
                <h1>0</h1>
            </div>

            <div className="card">
                <h3>💰 Revenus</h3>
                <h1>0 FCFA</h1>
            </div>

        </div>

    );

}

export default DashboardCards;