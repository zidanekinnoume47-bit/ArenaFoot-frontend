import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("verifyEmail");

    setOpen(false);

    navigate("/login");
  };


  return (

    <nav className="navbar">

      {/* =========================
          LOGO
      ========================= */}

      <Link
        to="/"
        className="navbar-logo"
        onClick={() => setOpen(false)}
      >

        <span className="logo-trophy">
          🏆
        </span>

        <span className="logo-text">
          Arena<span>Foot</span>
        </span>

      </Link>


      {/* =========================
          BURGER
      ========================= */}

      <button
        className={`burger ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >

        <span></span>
        <span></span>
        <span></span>

      </button>


      {/* =========================
          NAVIGATION
      ========================= */}

      <ul className={`nav-links ${open ? "active" : ""}`}>

        <li>
          <Link
            to="/"
            onClick={() => setOpen(false)}
          >
            <span>🏠</span>
            Accueil
          </Link>
        </li>


        <li>
          <Link
            to="/tournaments"
            onClick={() => setOpen(false)}
          >
            <span>🏆</span>
            Tournois
          </Link>
        </li>


        <li>
          <Link
            to="/ranking"
            onClick={() => setOpen(false)}
          >
            <span>🥇</span>
            Classement
          </Link>
        </li>


        {/* =========================
            SI CONNECTÉ
        ========================= */}

        {user ? (

          <>
            <li>
              <Link
                to="/dashboard"
                className="dashboard-link"
                onClick={() => setOpen(false)}
              >
                <span>🎮</span>
                Mon espace
              </Link>
            </li>


            <li className="user-menu">

              <Link
                to="/profile"
                className="user-profile"
                onClick={() => setOpen(false)}
              >

                <span className="user-avatar">
                  👤
                </span>

                <span>
                  {user.pseudo}
                </span>

              </Link>

            </li>


            <li>

              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Déconnexion
              </button>

            </li>
          </>

        ) : (

          /* =========================
             SI PAS CONNECTÉ
          ========================= */

          <>

            <li>
              <Link
                to="/login"
                className="login-link"
                onClick={() => setOpen(false)}
              >
                Connexion
              </Link>
            </li>


            <li>

              <Link
                to="/register"
                className="register-btn"
                onClick={() => setOpen(false)}
              >
                Créer un compte
              </Link>

            </li>

          </>

        )}

      </ul>

    </nav>

  );

}

export default Navbar;