import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/verifyEmail.css";

const API =
  import.meta.env.VITE_API_URL ||
  "https://arenafoot-backend-production.up.railway.app";

function VerifyEmail() {

  const navigate = useNavigate();
  const location = useLocation();

  const email =
    location.state?.email ||
    localStorage.getItem("verifyEmail") ||
    "";

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async (e) => {

    e.preventDefault();

    if (!code || code.length !== 6) {
      setError("Veuillez entrer le code à 6 chiffres.");
      return;
    }

    try {

      setLoading(true);
      setError("");
      setMessage("");

      const response = await axios.post(
        `${API}/api/users/verify-email`,
        {
          email,
          code
        }
      );

      setMessage(
        response.data.message ||
        "Compte vérifié avec succès 🎉"
      );

      localStorage.removeItem("verifyEmail");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {

      console.error(
        "Erreur vérification :",
        error
      );

      setError(
        error.response?.data?.message ||
        "Erreur lors de la vérification."
      );

    } finally {

      setLoading(false);

    }

  };

  if (!email) {

    return (
      <div className="verify-page">

        <div className="verify-box">

          <h1>⚠️ Vérification</h1>

          <p>
            Impossible de récupérer l'adresse email.
          </p>

          <button onClick={() => navigate("/register")}>
            Retour à l'inscription
          </button>

        </div>

      </div>
    );

  }

  return (

    <div className="verify-page">

      <div className="verify-box">

        <div className="verify-icon">
          📧
        </div>

        <h1>
          Vérifiez votre email
        </h1>

        <p>
          Un code de vérification a été envoyé à :
        </p>

        <strong>
          {email}
        </strong>

        <form onSubmit={handleVerify}>

          <input
            type="text"
            inputMode="numeric"
            maxLength="6"
            placeholder="000000"
            value={code}
            onChange={(e) =>
              setCode(
                e.target.value.replace(/\D/g, "")
              )
            }
          />

          <button
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Vérification..."
              : "Vérifier mon compte"
            }

          </button>

        </form>

        {message && (
          <p className="verify-success">
            {message}
          </p>
        )}

        {error && (
          <p className="verify-error">
            {error}
          </p>
        )}

        <p className="verify-info">
          Le code est valable pendant 10 minutes.
        </p>

      </div>

    </div>

  );

}

export default VerifyEmail;