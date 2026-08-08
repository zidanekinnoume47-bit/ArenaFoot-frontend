import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/passwordReset.css";

const API =
  import.meta.env.VITE_API_URL ||
  "https://arenafoot-backend-production.up.railway.app";

function ForgotPassword() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!email) {
      alert("Veuillez entrer votre adresse email.");
      return;
    }

    try {

      setLoading(true);

      const response = await axios.post(
        `${API}/api/users/forgot-password`,
        {
          email
        }
      );

      console.log(response.data);

      localStorage.setItem(
        "resetEmail",
        email
      );

      navigate("/verify-reset-code", {
        state: {
          email
        }
      });

    } catch (error) {

      console.error(
        "Erreur mot de passe oublié :",
        error
      );

      alert(
        error.response?.data?.message ||
        "Impossible d'envoyer le code."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="verify-page">

      <div className="verify-box">

        <div className="verify-icon">
          🔑
        </div>

        <h1>
          Mot de passe oublié ?
        </h1>

        <p>
          Entrez votre adresse email.
          Un code de vérification vous sera envoyé.
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Votre adresse email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Envoi du code..."
              : "Envoyer le code"
            }
          </button>

        </form>

        <button
          type="button"
          onClick={() => navigate("/login")}
          style={{
            marginTop: "12px",
            background: "transparent"
          }}
        >
          ← Retour à la connexion
        </button>

      </div>

    </div>

  );

}

export default ForgotPassword;