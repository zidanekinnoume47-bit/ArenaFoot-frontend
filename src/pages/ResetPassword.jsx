import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/passwordReset.css";

const API =
  import.meta.env.VITE_API_URL ||
  "https://arenafoot-backend-production.up.railway.app";

function ResetPassword() {

  const navigate = useNavigate();
  const location = useLocation();

  const email =
    location.state?.email ||
    localStorage.getItem("resetEmail") ||
    "";

  const code =
    location.state?.code || "";

  const user_id =
    location.state?.user_id || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {

    e.preventDefault();

    if (!password || !confirmPassword) {

      alert(
        "Veuillez remplir tous les champs."
      );

      return;
    }

    if (password.length < 6) {

      alert(
        "Le mot de passe doit contenir au moins 6 caractères."
      );

      return;
    }

    if (password !== confirmPassword) {

      alert(
        "Les mots de passe ne correspondent pas."
      );

      return;
    }

    if (!email || !code || !user_id) {

      alert(
        "Session de réinitialisation invalide."
      );

      navigate("/forgot-password");

      return;
    }

    try {

      setLoading(true);

      const response = await axios.post(
        `${API}/api/users/reset-password`,
        {
          user_id,
          code,
          password
        }
      );

      alert(
        response.data.message ||
        "Mot de passe modifié avec succès 🎉"
      );

      localStorage.removeItem("resetEmail");

      navigate("/login");

    } catch (error) {

      console.error(
        "Erreur réinitialisation :",
        error
      );

      alert(
        error.response?.data?.message ||
        "Impossible de modifier le mot de passe."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="verify-page">

      <div className="verify-box">

        <div className="verify-icon">
          🔐
        </div>

        <h1>
          Nouveau mot de passe
        </h1>

        <p>
          Choisissez votre nouveau mot de passe.
        </p>

        <form onSubmit={handleReset}>

          <input
            type="password"
            placeholder="Nouveau mot de passe"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            disabled={loading}
          />

          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Modification..."
              : "Modifier le mot de passe"
            }
          </button>

        </form>

      </div>

    </div>

  );

}

export default ResetPassword;