import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/adminAuth.css";

const API = import.meta.env.VITE_API_URL;

function AdminVerifyResetCode() {

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!code) {
      alert("Veuillez entrer le code.");
      return;
    }

    try {

      setLoading(true);

      const response = await axios.post(
        `${API}/api/admin/verify-reset-code`,
        {
          email,
          code
        }
      );

      alert(response.data.message);

      navigate("/admin/reset-password", {
        state: {
          email,
          code
        }
      });

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Code incorrect."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="admin-auth-page">

      <div className="admin-auth-box">

        <div className="admin-auth-icon">
          📩
        </div>

        <h1>Vérification</h1>

        <p>
          Entrez le code envoyé à :
        </p>

        <strong>
          {email}
        </strong>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            maxLength="6"
            placeholder="Code à 6 chiffres"
            value={code}
            onChange={(e) =>
              setCode(e.target.value.replace(/\D/g, ""))
            }
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

      </div>

    </div>

  );

}

export default AdminVerifyResetCode;