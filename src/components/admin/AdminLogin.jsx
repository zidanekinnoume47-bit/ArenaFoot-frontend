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
  const [showPassword, setShowPassword] = useState(false);


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

      console.log(
        "Connexion admin :",
        response.data
      );


      if (response.data.token) {

        localStorage.setItem(
          "adminToken",
          response.data.token
        );

      }


      if (response.data.user) {

        localStorage.setItem(
          "adminUser",
          JSON.stringify(
            response.data.user
          )
        );

      }


      alert(
        "Connexion administrateur réussie 🎉"
      );

      navigate(
        "/admin/dashboard"
      );

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


      {/* BACKGROUND */}

      <div className="admin-login-background">

        <div className="admin-glow glow-one"></div>

        <div className="admin-glow glow-two"></div>

        <div className="admin-grid"></div>

      </div>



      {/* LOGIN CARD */}

      <div className="admin-login-box">


        {/* LOGO */}

        <div className="admin-login-logo">

          <div className="admin-login-icon">
            👑
          </div>

        </div>


        <div className="admin-login-badge">

          <span></span>

          ADMIN CONTROL CENTER

        </div>


        <h1>
          Arena<span>Foot</span>
        </h1>


        <h2>
          Espace administrateur
        </h2>


        <p className="admin-login-description">

          Gérez vos tournois, joueurs,
          paiements et compétitions.

        </p>



        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="admin-login-form"
        >


          {/* EMAIL */}

          <div className="admin-input-group">

            <label>
              Email administrateur
            </label>


            <div className="admin-input-wrapper">

              <span className="admin-input-icon">
                ✉️
              </span>


              <input
                type="email"
                placeholder="admin@arenafoot.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                autoComplete="username"
              />

            </div>

          </div>



          {/* PASSWORD */}

          <div className="admin-input-group">

            <div className="admin-password-label">

              <label>
                Mot de passe
              </label>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/admin/forgot-password"
                  )
                }
              >
                Mot de passe oublié ?
              </button>

            </div>


            <div className="admin-input-wrapper">

              <span className="admin-input-icon">
                🔐
              </span>


              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Votre mot de passe"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                autoComplete="current-password"
              />


              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword
                  ? "🙈"
                  : "👁️"
                }
              </button>

            </div>

          </div>



          {/* LOGIN BUTTON */}

          <button
            type="submit"
            className="admin-login-submit"
            disabled={loading}
          >

            {loading ? (

              <>

                <span className="login-spinner"></span>

                Connexion...

              </>

            ) : (

              <>

                Accéder au dashboard

                <span>
                  →
                </span>

              </>

            )}

          </button>


        </form>



        {/* SECURITY */}

        <div className="admin-security">

          <span>
            🛡️
          </span>

          <div>

            <strong>
              Connexion sécurisée
            </strong>

            <p>
              Accès réservé aux administrateurs ArenaFoot.
            </p>

          </div>

        </div>



        {/* BACK */}

        <button
          className="admin-back-button"
          onClick={() =>
            navigate("/")
          }
        >

          ← Retour à ArenaFoot

        </button>


      </div>


      {/* FOOTER */}

      <div className="admin-login-footer">

        ArenaFoot Administration
        <span>•</span>
        Secure Access

      </div>


    </div>

  );

}

export default AdminLogin;