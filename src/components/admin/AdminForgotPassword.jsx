import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/adminAuth.css";

const API = import.meta.env.VITE_API_URL;

function AdminForgotPassword() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!email) {
      alert("Veuillez entrer votre email.");
      return;
    }

    try {

      setLoading(true);

      const response = await axios.post(
        `${API}/api/admin/forgot-password`,
        { email }
      );

      alert(response.data.message);

      navigate("/admin/verify-reset-code", {
        state: {
          email
        }
      });

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Impossible d'envoyer le code."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="admin-auth-page">

      <div className="admin-auth-box">

        <div className="admin-auth-icon">
          🔑
        </div>

        <h1>Mot de passe oublié</h1>

        <p>
          Entrez votre adresse email administrateur.
          Un code de vérification vous sera envoyé.
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Email administrateur"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Envoi..."
              : "Envoyer le code"
            }
          </button>

        </form>

        <button
          className="secondary-button"
          onClick={() => navigate("/admin/login")}
        >
          ← Retour à la connexion
        </button>

      </div>

    </div>

  );

}

export default AdminForgotPassword;