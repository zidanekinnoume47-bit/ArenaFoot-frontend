import React from "react";
import heroImage from "../assets/hero-efootball.jpg";
import { Link } from "react-router-dom";
import "../styles/hero.css";

function Hero() {
  return (
    <section className="hero">

      {/* Décor animé */}
      <div className="hero-background">
        <span className="particle particle-1"></span>
        <span className="particle particle-2"></span>
        <span className="particle particle-3"></span>
        <span className="particle particle-4"></span>
        <span className="particle particle-5"></span>
      </div>

      <div className="hero-glow"></div>

      {/* CONTENU */}
      <div className="hero-content">

        {/* BADGE */}
        <div className="hero-badge">
          <i className="bi bi-trophy-fill"></i>
          TOURNOIS eFOOTBALL / Call of Duty
        </div>

        {/* TITRE */}
        <h1>
          Le terrain virtuel.
          <br />

          <span>La vraie compétition.</span>
        </h1>

        {/* DESCRIPTION */}
        <p>
          Affronte des joueurs, participe à des tournois eFootball
          et bats-toi pour atteindre le sommet.
        </p>

        {/* BOUTONS */}
        <div className="hero-buttons">

          <Link
            to="/register"
            className="btn-primary"
          >
            <i className="bi bi-rocket-takeoff-fill"></i>
            Créer un compte
          </Link>

          <Link
            to="/tournaments"
            className="btn-secondary"
          >
            <i className="bi bi-controller"></i>
            Voir les tournois
          </Link>

        </div>

        {/* INFORMATIONS */}
        <div className="hero-info">

          <div>
            <strong>
              <i className="bi bi-controller"></i>
            </strong>

            <span>
              eFootball
            </span>
          </div>

          <div>
            <strong>
              <i className="bi bi-people-fill"></i>
            </strong>

            <span>
              Joueurs
            </span>
          </div>

          <div>
            <strong>
              <i className="bi bi-award-fill"></i>
            </strong>

            <span>
              Récompenses
            </span>
          </div>

        </div>

      </div>

      {/* IMAGE */}
      <div className="hero-image-container">

        <div className="image-glow"></div>

        <div className="hero-image">

          <img
            src={heroImage}
            alt="ArenaFoot eFootball et Call of Duty"
          />

          <div className="image-overlay"></div>

        </div>

        {/* BADGE FLOTTANT */}
        <div className="floating-card">

          <span className="live-dot"></span>

          <div>
            <strong>ARENAFOOT</strong>

            <small>
              Entre dans l'arène
            </small>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;