import React from "react";
import "../styles/HowItWorks.css";

function HowItWorks() {

  const steps = [
    {
      number: "01",
      icon: "👤",
      title: "Créer un compte",
      text: "Inscris-toi gratuitement et crée ton profil joueur eFootball."
    },
    {
      number: "02",
      icon: "💳",
      title: "Payer la participation",
      text: "Choisis ton tournoi et règle les frais d'inscription en ligne."
    },
    {
      number: "03",
      icon: "🎮",
      title: "Jouer ton match",
      text: "Rejoins ton adversaire grâce au code de salle eFootball."
    },
    {
      number: "04",
      icon: "🏆",
      title: "Se qualifier",
      text: "Gagne tes matchs et avance jusqu'à la finale."
    },
    {
      number: "05",
      icon: "💰",
      title: "Recevoir ta récompense",
      text: "Le gagnant reçoit directement son gain sur son numéro de dépôt."
    }
  ];

  return (
    <section className="how-section">

      <div className="how-background-glow"></div>

      <div className="how-header">

        <span className="how-badge">
          ⚡ SIMPLE & RAPIDE
        </span>

        <h2>
          Comment ça <span>marche ?</span>
        </h2>

        <p>
          En quelques étapes, passe de joueur à
          <strong> prétendant au titre.</strong>
        </p>

      </div>


      <div className="steps-container">

        {steps.map((step, index) => (

          <React.Fragment key={step.number}>

            <div
              className="step-card"
              style={{
                animationDelay: `${index * 0.12}s`
              }}
            >

              <div className="step-top">

                <span className="step-number">
                  {step.number}
                </span>

                <span className="step-icon">
                  {step.icon}
                </span>

              </div>


              <h3>
                {step.title}
              </h3>


              <p>
                {step.text}
              </p>


              <div className="step-line"></div>

            </div>


            {index < steps.length - 1 && (
              <div className="step-arrow">
                →
              </div>
            )}

          </React.Fragment>

        ))}

      </div>


      <div className="how-bottom">

        <span>
          🏆
        </span>

        <p>
          <strong>Un tournoi.</strong>{" "}
          Une chance de devenir champion.
        </p>

      </div>

    </section>
  );
}

export default HowItWorks;