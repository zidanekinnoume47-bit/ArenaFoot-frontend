import React from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "../styles/payment.css";
const API = import.meta.env.VITE_API_URL;

function Payment() {

    const location = useLocation();

    const tournament = location.state?.tournament;
    

    const storedUser = localStorage.getItem("user");

    const user = storedUser ? JSON.parse(storedUser) : null;

    console.log(user);

    if (!tournament) {

        return (
            <div className="payment-page">
                <div className="payment-box">
                    <h2>Aucun tournoi sélectionné.</h2>
                </div>
            </div>
        );

    }

    const handlePayment = async () => {

        try {

            if (!user) {

                alert("Vous devez être connecté.");

                return;

            }

            console.log({
    player_id: user.id,
    user_id: user.id,
    tournament_id: tournament.id,
    amount: tournament.entry_fee,
    firstname: user.pseudo,
    lastname: "ArenaFoot",
    email: user.email
});




            const response = await axios.post(
                `${API}/api/payments/create`,
                {

                    player_id: user.id,
                    user_id: user.id,

                    tournament_id: tournament.id,

                    amount: tournament.entry_fee,

                    method: "mobile_money",

                    firstname: user.pseudo || "Joueur",

                    lastname: "ArenaFoot",

                    email: user.email

                }
            );

            localStorage.setItem(
                "payment_id",
                response.data.payment_id
            );

            if (response.data.payment_url) {

                window.location.href =
                    response.data.payment_url;

            } else {

                alert("Lien de paiement introuvable.");

            }

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Erreur création paiement."
            );

        }

    };

    return (

        <div className="payment-page">

            <div className="payment-box">

                <h1>💳 Paiement ArenaFoot</h1>

                <h2>{tournament.name}</h2>

                <p>

                    Participation :

                    <strong>

                        {" "}
                        {tournament.entry_fee} FCFA

                    </strong>

                </p>

                <p>

                    Récompense :

                    <strong>

                        {" "}
                        {tournament.reward} FCFA

                    </strong>

                </p>

                <h3>Moyen de paiement</h3>

                <button disabled>

                    📱 Mobile Money (FedaPay)

                </button>

                <button
                    className="confirm"
                    onClick={handlePayment}
                >

                    Payer maintenant

                </button>

            </div>

        </div>

    );

}

export default Payment;