import React, { useEffect, useState } from "react";
import axios from "axios";
import TournamentCard from "../components/TournamentCard";
import "../styles/tournaments.css";

function Tournaments() {

  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {

    axios
      .get("http://localhost:5000/api/tournaments")
      .then((response) => {

        console.log("Tournois API :", response.data);

        setTournaments(response.data);

      })
      .catch((error) => {

        console.log(
          "Erreur chargement tournois :",
          error
        );

      });

  }, []);


  return (
    <div className="tournaments-page">

      <h1>🏆 Les tournois ArenaFoot</h1>

      <div className="tournaments-container">

        {
          tournaments.length > 0 ?

          tournaments.map((tournament) => (
            <TournamentCard
              key={tournament.id}
              tournament={tournament}
            />
          ))

          :

          <p>Aucun tournoi disponible</p>
        }

      </div>

    </div>
  );
}

export default Tournaments;