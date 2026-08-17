import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/register.css";

const API = import.meta.env.VITE_API_URL;

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    pseudo: "",
    email: "",
    phone: "",
    payment_phone: "",
    efootball_id: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (loading) {
      return;
    }

    if (
      !formData.name ||
      !formData.pseudo ||
      !formData.email ||
      !formData.phone ||
      !formData.payment_phone ||
      !formData.efootball_id ||
      !formData.password
    ) {

      alert("Veuillez remplir tous les champs.");

      return;
    }

    try {

      setLoading(true);

      const response = await axios.post(
        `${API}/api/users/register`,
        formData
      );

      console.log(
        "Réponse inscription :",
        response.data
      );

      localStorage.setItem(
        "verifyEmail",
        formData.email
      );

      navigate("/verify-email", {
        state: {
          email: formData.email
        }
      });

    } catch (error) {

      console.error(
        "Erreur inscription :",
        error
      );

      alert(
        error.response?.data?.message ||
        "Erreur lors de la création du compte"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="register-page">

      {/* Décorations */}
      <div className="register-glow glow-one"></div>
      <div className="register-glow glow-two"></div>

      <div className="register-container">

        {/* Partie gauche */}
        <div className="register-presentation">

          <div className="arena-logo">
            🏆
          </div>

          <span className="register-badge">
            ARENAFOOT
          </span>

          <h1>
            Entre dans<br />
            <span>l'arène.</span>
          </h1>

          <p>
            Crée ton compte, affronte les meilleurs
            joueurs eFootball et tente de décrocher
            la victoire.
          </p>

          <div className="register-features">

            <div className="feature">
              <span>⚡</span>
              <div>
                <strong>Tournois compétitifs</strong>
                <small>Affronte des joueurs de ton niveau</small>
              </div>
            </div>

            <div className="feature">
              <span>🏆</span>
              <div>
                <strong>Récompenses</strong>
                <small>Gagne et reçois tes récompenses</small>
              </div>
            </div>

            <div className="feature">
              <span>🔒</span>
              <div>
                <strong>Compte sécurisé</strong>
                <small>Ton compte est protégé</small>
              </div>
            </div>

          </div>

        </div>


        {/* Formulaire */}
        <div className="register-box">

          <div className="register-header">

            <h2>
              Créer ton compte
            </h2>

            <p>
              Rejoins la communauté ArenaFoot
            </p>

          </div>


          <form onSubmit={handleSubmit}>

            <div className="input-group">

              <label>
                Nom complet
              </label>

              <input
                type="text"
                name="name"
                placeholder="Ex : Zidane Kinnoume"
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
              />

            </div>


            <div className="input-group">

              <label>
                Pseudo
              </label>

              <input
                type="text"
                name="pseudo"
                placeholder="Ton pseudo de joueur"
                value={formData.pseudo}
                onChange={handleChange}
                disabled={loading}
              />

            </div>


            <div className="input-group">

              <label>
                Adresse email
              </label>

              <input
                type="email"
                name="email"
                placeholder="exemple@email.com"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />

            </div>


            <div className="form-row">

              <div className="input-group">

                <label>
                  Téléphone
                </label>

                <input
                  type="text"
                  name="phone"
                  placeholder="+229..."
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={loading}
                />

              </div>


              <div className="input-group">

                <label>
                  Dépôt MyFeda
                </label>

                <input
                  type="text"
                  name="payment_phone"
                  placeholder="+229..."
                  value={formData.payment_phone}
                  onChange={handleChange}
                  disabled={loading}
                />

              </div>

            </div>


            <div className="input-group">

              <label>
                ID eFootball
              </label>

              <input
                type="text"
                name="efootball_id"
                placeholder="Ton ID eFootball"
                value={formData.efootball_id}
                onChange={handleChange}
                disabled={loading}
              />

            </div>


            <div className="input-group">

              <label>
                Mot de passe
              </label>

              <div className="password-wrapper">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Créer un mot de passe"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>

              </div>

            </div>


            <button
              type="submit"
              className="register-button"
              disabled={loading}
            >

              <span>
                {loading
                  ? "Création du compte..."
                  : "Créer mon compte"
                }
              </span>

              {!loading && (
                <span className="button-arrow">
                  →
                </span>
              )}

            </button>

          </form>


          <div className="register-security">

            🔐 Tes informations sont protégées

          </div>

        </div>

      </div>

    </div>

  );
}

export default Register;