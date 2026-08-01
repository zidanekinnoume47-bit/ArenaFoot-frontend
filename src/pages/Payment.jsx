import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/payment.css";

function Payment() {
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      // Tu pourras ajouter ton appel axios.post pour enregistrer le paiement ici si besoin
      alert("Paiement confirmé avec succès !");
      navigate("/dashboard");
    } catch (error) {
      alert("Erreur lors du paiement");
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-box">
        <h1>💳 Paiement ArenaFoot</h1>

        <p>Tournoi : Ligue ArenaFoot</p>
        <p>
          Montant à payer : <strong>5 000 FCFA</strong>
        </p>

        <h3>Choisir un moyen de paiement</h3>

        <button>📱 Mobile Money</button>
        <button>💳 Carte bancaire</button>
        <button>₿ Crypto</button>

        <button className="confirm" onClick={handlePayment}>
          Confirmer la participation
        </button>
      </div>
    </div>
  );
}

export default Payment;