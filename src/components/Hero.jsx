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

        <div className="hero-badge">
          🏆 TOURNOIS eFOOTBALL / Call of Duty
        </div>

        <h1>
          Le terrain virtuel.
          <br />

          <span>La vraie compétition.</span>
        </h1>

        <p>
          Affronte des joueurs, participe à des tournois eFootball
          et bats-toi pour atteindre le sommet.
        </p>

        <div className="hero-buttons">

          <Link
            to="/register"
            className="btn-primary"
          >
            🚀 Créer un compte
          </Link>

          <Link
            to="/tournaments"
            className="btn-secondary"
          >
            🎮 Voir les tournois
          </Link>

        </div>

        <div className="hero-info">

          <div>
            <strong>🎮</strong>
            <span>eFootball</span>
          </div>

          <div>
            <strong>👥</strong>
            <span>16 joueurs</span>
          </div>

          <div>
            <strong>🏆</strong>
            <span>Récompenses</span>
          </div>

        </div>

      </div>


      {/* IMAGE */}
      <div className="hero-image-container">

        <div className="image-glow"></div>

        <div className="hero-image">

          <img
            src={heroImage}
            alt="ArenaFoot eFootball"
          />

          <div className="image-overlay"></div>

        </div>

        {/* Badge flottant */}
        <div className="floating-card">

          <span className="live-dot"></span>

          <div>
            <strong>ARENAFOOT</strong>
            <small>Entre dans l'arène</small>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;