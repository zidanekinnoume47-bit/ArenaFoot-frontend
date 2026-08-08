import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/passwordReset.css";

const API =
  import.meta.env.VITE_API_URL ||
  "https://arenafoot-backend-production.up.railway.app";

function VerifyResetCode() {

  const navigate = useNavigate();
  const location = useLocation();

  const email =
    location.state?.email ||
    localStorage.getItem("resetEmail") ||
    "";

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async (e) => {

    e.preventDefault();

    if (code.length !== 6) {

      alert(
        "Veuillez entrer le code à 6 chiffres."
      );

      return;
    }

    try {

      setLoading(true);

      const response = await axios.post(
        `${API}/api/users/verify-reset-code`,
        {
          email,
          code
        }
      );

      console.log(response.data);

      navigate("/reset-password", {
        state: {
          email,
          code,
          user_id: response.data.user_id
        }
      });

    } catch (error) {

      console.error(
        "Erreur vérification code :",
        error
      );

      alert(
        error.response?.data?.message ||
        "Code incorrect."
      );

    } finally {

      setLoading(false);

    }

  };

  if (!email) {

    return (

      <div className="verify-page">

        <div className="verify-box">

          <h1>⚠️ Erreur</h1>

          <p>
            Adresse email introuvable.
          </p>

          <button
            onClick={() =>
              navigate("/forgot-password")
            }
          >
            Recommencer
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
          Vérification
        </h1>

        <p>
          Un code a été envoyé à :
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
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Vérification..."
              : "Vérifier le code"
            }
          </button>

        </form>

        <p className="verify-info">
          Le code est valable pendant 10 minutes.
        </p>

      </div>

    </div>

  );

}

export default VerifyResetCode;