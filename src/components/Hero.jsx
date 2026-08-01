import React from 'react';
import heroImage from "../assets/hero-efootball.jpeg";
import { Link } from "react-router-dom";
import "../styles/hero.css";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <h1>
          Le plus grand site de
          <br />
          tournois eFootball
        </h1>

        <p>
          Affronte les meilleurs joueurs, participe à des compétitions
          en ligne et remporte des récompenses directement sur ton
          Mobile Money.
        </p>

        <div className="hero-buttons">

          <Link to="/register" className="btn-primary">
            Créer un compte
          </Link>

          <Link to="/tournaments" className="btn-secondary">
            Voir les tournois
          </Link>

        </div>

      </div>

      <div className="hero-image">

        <img
          src={heroImage}
          alt="ArenaFoot eFootball"
        />

      </div>

    </section>
  );
}

export default Hero;