import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/adminLogin.css";

const API = import.meta.env.VITE_API_URL;

function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!email || !password) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {

      setLoading(true);

      const response = await axios.post(
        `${API}/api/admin/login`,
        {
          email,
          password
        }
      );

      console.log("Connexion admin :", response.data);

      // Enregistrer le token
      if (response.data.token) {

        localStorage.setItem(
          "adminToken",
          response.data.token
        );

      }

      // Enregistrer les informations admin
      if (response.data.user) {

        localStorage.setItem(
          "adminUser",
          JSON.stringify(response.data.user)
        );

      }

      alert("Connexion administrateur réussie 🎉");

      navigate("/admin/dashboard");

    } catch (error) {

      console.error(
        "Erreur connexion admin :",
        error
      );

      alert(
        error.response?.data?.message ||
        "Impossible de se connecter"
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div className="admin-login-page">

      <div className="admin-login-box">

        <div className="admin-login-icon">
          🔐
        </div>

        <h1>
          ArenaFoot
        </h1>

        <h2>
          Administration
        </h2>

        <p className="admin-login-description">
          Connectez-vous à votre espace administrateur.
        </p>


        <form onSubmit={handleSubmit}>

          <div className="admin-input-group">

            <label>
              Email administrateur
            </label>

            <input
              type="email"
              placeholder="admin@arenafoot.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>


          <div className="admin-input-group">

            <label>
              Mot de passe
            </label>

            <input
              type="password"
              placeholder="Votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

          </div>


          <button
            type="submit"
            disabled={loading}
          >

            {loading
              ? "Connexion..."
              : "Se connecter"
            }

          </button>

        </form>


        <button
          className="admin-forgot-button"
          onClick={() => navigate("/admin/forgot-password")}
        >
          Mot de passe oublié ?
        </button>


        <button
          className="admin-back-button"
          onClick={() => navigate("/")}
        >
          ← Retour à ArenaFoot
        </button>

      </div>

    </div>

  );

}

export default AdminLogin;