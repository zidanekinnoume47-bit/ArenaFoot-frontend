import React from "react";
import "../../styles/admin.css";

function DashboardCards({
    players,
    tournaments,
    payments
}) {

    const successfulPayments =
        payments.filter(
            payment => payment.status === "success"
        );

    const revenue =
        successfulPayments.reduce(
            (total, payment) => total + Number(payment.amount),
            0
        );

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
                <h1>{successfulPayments.length}</h1>
            </div>

            <div className="card">
                <h3>💰 Revenus</h3>
                <h1>{revenue} FCFA</h1>
            </div>

        </div>

    );

}

export default DashboardCards;