import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/adminAuth.css";

const API = import.meta.env.VITE_API_URL;

function AdminResetPassword() {

  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";
  const code = location.state?.code || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!password || !confirmPassword) {
      alert("Veuillez remplir tous les champs.");
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

    try {

      setLoading(true);

      const response = await axios.post(
        `${API}/api/admin/reset-password`,
        {
          email,
          code,
          password
        }
      );

      alert(response.data.message);

      navigate("/admin/login");

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Impossible de modifier le mot de passe."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="admin-auth-page">

      <div className="admin-auth-box">

        <div className="admin-auth-icon">
          🔐
        </div>

        <h1>Nouveau mot de passe</h1>

        <p>
          Choisissez votre nouveau mot de passe administrateur.
        </p>

        <form onSubmit={handleSubmit}>

          <input
            type="password"
            placeholder="Nouveau mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
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

export default AdminResetPassword;