import React, { useEffect, useState } from "react";
import axios from "axios";

import "../styles/home.css";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TournamentCard from "../components/TournamentCard";
import RankingCard from "../components/RankingCard";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";

const API = import.meta.env.VITE_API_URL;

function Home() {

  const [tournament, setTournament] = useState(null);

  useEffect(() => {

    axios
      .get(`${API}/api/tournaments`)
      .then((response) => {

        console.log("TOURNOIS :", response.data);

        if (response.data && response.data.length > 0) {
          setTournament(response.data[0]);
        }

      })
      .catch((error) => {

        console.log("ERREUR API :", error);

      });

  }, []);

  return (
    <div className="home-page">

      {/* =========================
          NAVBAR
      ========================= */}
      <Navbar />


      {/* =========================
          HERO
      ========================= */}
      <main>

        <section className="home-hero-wrapper">

          <div className="hero-glow hero-glow-one"></div>
          <div className="hero-glow hero-glow-two"></div>

          <div className="floating-ball ball-one">⚽</div>
          <div className="floating-ball ball-two">🎮</div>
          <div className="floating-trophy">🏆</div>

          <Hero />

        </section>


        {/* =========================
            INTRODUCTION
        ========================= */}
        <section className="arena-intro">

          <div className="intro-content">

            <span className="section-badge">
              ⚡ BIENVENUE DANS L'ARÈNE
            </span>

            <h2>
              Ton talent mérite
              <span> une vraie compétition.</span>
            </h2>

            <p>
              ArenaFoot transforme tes matchs eFootball en véritables
              compétitions. Affronte des joueurs, progresse, gagne et
              impose ton nom dans l'arène.
            </p>

          </div>

        </section>


        {/* =========================
            TOURNOI + CLASSEMENT
        ========================= */}
        <section className="home-section">

          <div className="section-heading">

            <span>🏟️ COMPÉTITION</span>

            <h2>
              Entre dans la compétition
            </h2>

            <p>
              Les meilleures batailles commencent ici.
            </p>

          </div>


          <div className="cards-container">

            {tournament && (
              <div className="animated-card tournament-wrapper">
                <TournamentCard tournament={tournament} />
              </div>
            )}

            <div className="animated-card ranking-wrapper">
              <RankingCard />
            </div>

          </div>

        </section>


        {/* =========================
            COMMENT ÇA MARCHE
        ========================= */}
        <HowItWorks />


        {/* =========================
            MOTIVATION
        ========================= */}
        <section className="motivation-section">

          <div className="motivation-overlay"></div>

          <div className="motivation-content">

            <span className="section-badge">
              🏆 L'ARÈNE T'ATTEND
            </span>

            <h2>
              Tu ne viens pas seulement jouer.
            </h2>

            <h3>
              Tu viens prouver ce que tu vaux.
            </h3>

            <p>
              Affronte plus fort. Apprends. Progresse.
              Puis prends ta place parmi les meilleurs.
            </p>

            <button
              className="main-cta"
              onClick={() => {
                window.location.href = "/tournaments";
              }}
            >
              🔥 Rejoindre un tournoi
            </button>

          </div>

        </section>


        {/* =========================
            STATISTIQUES
        ========================= */}
        <section className="stats-section">

          <div className="stat-box">

            <span>🎮</span>

            <strong>eFootball</strong>

            <p>Des compétitions passionnantes</p>

          </div>


          <div className="stat-box">

            <span>👥</span>

            <strong>16 joueurs</strong>

            <p>Une place pour devenir champion</p>

          </div>


          <div className="stat-box">

            <span>🥇</span>

            <strong>1 Champion</strong>

            <p>Un seul prendra le sommet</p>

          </div>


          <div className="stat-box">

            <span>💰</span>

            <strong>Récompenses</strong>

            <p>Les meilleurs sont récompensés</p>

          </div>

        </section>


        {/* =========================
            CTA FINAL
        ========================= */}
        <section className="final-cta">

          <div className="final-cta-content">

            <span>⚡ PRÊT À ENTRER DANS L'ARÈNE ?</span>

            <h2>
              Écris ton histoire.
            </h2>

            <p>
              Chaque tournoi est une nouvelle chance
              de montrer ton niveau.
            </p>

            <button
              onClick={() => {
                window.location.href = "/tournaments";
              }}
            >
              🚀 Commencer maintenant
            </button>

          </div>

        </section>

      </main>


      <Footer />

    </div>
  );
}

export default Home;