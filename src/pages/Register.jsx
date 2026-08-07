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

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    // Empêche les doubles clics
    if (loading) {
      return;
    }

    // Vérification des champs
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

      /*
       * IMPORTANT :
       * Aucun token n'est enregistré ici.
       * Le compte doit d'abord être vérifié par email.
       */

      localStorage.setItem(
        "verifyEmail",
        formData.email
      );

      /*
       * On ne dit PAS encore
       * "Compte créé avec succès".
       *
       * On envoie directement
       * l'utilisateur vers la vérification.
       */

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

      <div className="register-box">

        <h1>
          🏆 Créer un compte ArenaFoot
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Nom complet"
          value={formData.name}
          onChange={handleChange}
          disabled={loading}
        />

        <input
          type="text"
          name="pseudo"
          placeholder="Pseudo"
          value={formData.pseudo}
          onChange={handleChange}
          disabled={loading}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          disabled={loading}
        />

        <input
          type="text"
          name="phone"
          placeholder="Numéro de téléphone"
          value={formData.phone}
          onChange={handleChange}
          disabled={loading}
        />

        <input
          type="text"
          name="payment_phone"
          placeholder="Numéro de dépôt MyFeda"
          value={formData.payment_phone}
          onChange={handleChange}
          disabled={loading}
        />

        <input
          type="text"
          name="efootball_id"
          placeholder="ID eFootball"
          value={formData.efootball_id}
          onChange={handleChange}
          disabled={loading}
        />

        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          disabled={loading}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
        >

          {loading
            ? "Création du compte..."
            : "Créer mon compte"
          }

        </button>

      </div>

    </div>

  );

}

export default Register;