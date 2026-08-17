import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

import "../styles/bracket.css";

const API =
  import.meta.env.VITE_API_URL ||
  "https://arenafoot-backend-production.up.railway.app";

function Bracket() {

  const { id } = useParams();

  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    if (!id) return;

    setLoading(true);

    const token =
      localStorage.getItem("token");


    axios
      .get(
        `${API}/api/matches/bracket/${id}`,
        {
          headers: token
            ? {
                Authorization:
                  `Bearer ${token}`
              }
            : {}
        }
      )

      .then((res) => {

        console.log(
          "BRACKET API :",
          res.data
        );

        setMatches(
          Array.isArray(res.data)
            ? res.data
            : []
        );

      })

      .catch((err) => {

        console.error(
          "Erreur API bracket :",
          err
        );


        return axios.get(
          `${API}/api/tournaments/${id}/bracket`,
          {
            headers: token
              ? {
                  Authorization:
                    `Bearer ${token}`
                }
              : {}
          }
        );

      })

      .then((res) => {

        if (!res) return;

        console.log(
          "BRACKET TOURNOI :",
          res.data
        );

        setMatches(
          Array.isArray(res.data)
            ? res.data
            : []
        );

      })

      .catch((err) => {

        console.error(
          "Erreur chargement bracket :",
          err
        );

        setMatches([]);

      })

      .finally(() => {

        setLoading(false);

      });

  }, [id]);


  // =====================================
  // ROUNDS
  // =====================================

  const rounds = {

    "Huitième de finale": [],

    "Quart de finale": [],

    "Demi-finale": [],

    "Finale": []

  };


  matches.forEach((match) => {

    const roundName =
      match.round;


    if (

      roundName === "round_of_16" ||
      roundName === "Huitième de finale" ||
      roundName === "1/8"

    ) {

      rounds["Huitième de finale"]
        .push(match);

    }

    else if (

      roundName === "quarter_final" ||
      roundName === "quarter" ||
      roundName === "Quart de finale" ||
      roundName === "1/4"

    ) {

      rounds["Quart de finale"]
        .push(match);

    }

    else if (

      roundName === "semi_final" ||
      roundName === "semi" ||
      roundName === "Demi-finale" ||
      roundName === "1/2"

    ) {

      rounds["Demi-finale"]
        .push(match);

    }

    else if (

      roundName === "final" ||
      roundName === "Finale" ||
      roundName === "1/1"

    ) {

      rounds["Finale"]
        .push(match);

    }

  });


  // =====================================
  // MATCH CARD
  // =====================================

  const MatchCard = ({ match }) => {

    const p1 =
      match.player_one_pseudo ||
      match.player_one_name ||
      "À déterminer";


    const p2 =
      match.player_two_pseudo ||
      match.player_two_name ||
      "À déterminer";


    const score =
      match.score || "VS";


    return (

      <div className="match-card">

        <div className="match-number">

          Match #{match.id}

        </div>


        <div className="match-player">

          <span className="player-icon">
            🎮
          </span>

          <strong>
            {p1}
          </strong>

        </div>


        <div className="match-score">

          {score}

        </div>


        <div className="match-player">

          <span className="player-icon">
            🎮
          </span>

          <strong>
            {p2}
          </strong>

        </div>

      </div>

    );

  };


  // =====================================
  // ROUND COMPONENT
  // =====================================

  const Round = ({
    title,
    icon,
    matches,
    emptyText,
    className = ""
  }) => {

    return (

      <div
        className={`bracket-round ${className}`}
      >

        <div className="round-header">

          <span>
            {icon}
          </span>

          <div>

            <h2>
              {title}
            </h2>

            <small>
              {matches.length} match
              {matches.length > 1 ? "s" : ""}
            </small>

          </div>

        </div>


        <div className="round-matches">

          {matches.length > 0 ? (

            matches.map((match) => (

              <MatchCard
                key={match.id}
                match={match}
              />

            ))

          ) : (

            <div className="empty-round">

              <span>
                ⏳
              </span>

              <p>
                {emptyText}
              </p>

            </div>

          )}

        </div>

      </div>

    );

  };


  // =====================================
  // PAGE
  // =====================================

  return (

    <div className="bracket-page">


      {/* HEADER */}

      <header className="bracket-header">

        <Link
          to={`/tournaments/${id}`}
          className="back-link"
        >
          ← Retour au tournoi
        </Link>


        <div className="bracket-title">

          <span>
            🏆
          </span>

          <div>

            <small>
              ARENAFOOT
            </small>

            <h1>
              Tableau du tournoi
            </h1>

          </div>

        </div>


        <div className="bracket-status">

          <span></span>

          {matches.length > 0
            ? "Compétition active"
            : "En attente"
          }

        </div>

      </header>


      {/* CONTENU */}

      {loading ? (

        <div className="bracket-loading">

          <div className="loading-ball">
            ⚽
          </div>

          <h2>
            Chargement du bracket...
          </h2>

          <p>
            Préparation du tableau
            de compétition.
          </p>

        </div>

      ) : matches.length === 0 ? (

        <div className="bracket-empty">

          <div>
            🎮
          </div>

          <h2>
            Aucun match disponible
          </h2>

          <p>
            Les matchs apparaîtront ici
            dès que le bracket sera généré.
          </p>


          <Link
            to={`/tournaments/${id}`}
            className="return-button"
          >
            Retour au tournoi
          </Link>

        </div>

      ) : (

        <main className="bracket-wrapper">

          <div className="bracket-scroll">

            <div className="bracket">


              <Round
                title="Huitièmes"
                icon="⚔️"
                matches={
                  rounds[
                    "Huitième de finale"
                  ]
                }
                emptyText="En attente des joueurs"
                className="round-16"
              />


              <Round
                title="Quarts"
                icon="🔥"
                matches={
                  rounds[
                    "Quart de finale"
                  ]
                }
                emptyText="En attente des vainqueurs des huitièmes"
                className="quarter"
              />


              <Round
                title="Demi-finales"
                icon="⚡"
                matches={
                  rounds[
                    "Demi-finale"
                  ]
                }
                emptyText="En attente des vainqueurs des quarts"
                className="semi"
              />


              <Round
                title="Finale"
                icon="🏆"
                matches={
                  rounds[
                    "Finale"
                  ]
                }
                emptyText="En attente des deux finalistes"
                className="final"
              />


            </div>

          </div>

        </main>

      )}


    </div>

  );

}

export default Bracket;