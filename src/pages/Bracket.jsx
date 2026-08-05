import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../styles/bracket.css";

const API = import.meta.env.VITE_API_URL || "https://arenafoot-backend-production.up.railway.app";

function Bracket() {
  const { id } = useParams();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    const token = localStorage.getItem("token");

    // Tente d'abord de récupérer via l'API matches/bracket, sinon fallback sur la route tournament
    axios
      .get(`${API}/api/matches/bracket/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      })
      .then((res) => {
        console.log("BRACKET API :", res.data);
        setMatches(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Erreur API matches/bracket, essai route tournoi...", err);
        axios
          .get(`${API}/api/tournaments/${id}/bracket`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {}
          })
          .then((res) => {
            console.log("BRACKET API (Tournois) :", res.data);
            setMatches(Array.isArray(res.data) ? res.data : []);
          })
          .catch((e) => console.error("Erreur chargement bracket :", e));
      })
      .finally(() => setLoading(false));
  }, [id]);

  const finishMatch = async (matchId, winnerId) => {
    try {
      await axios.post(`${API}/api/matches/finish`, {
        match_id: matchId,
        winner: winnerId,
        score: "1-0"
      });

      alert("Match terminé avec succès !");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la validation du match");
    }
  };

  // Mapper les noms de tours de la BDD vers notre structure
  const rounds = {
    "Huitième de finale": [],
    "Quart de finale": [],
    "Demi-finale": [],
    "Finale": []
  };

  matches.forEach((match) => {
    const roundName = match.round;

    if (
      roundName === "round_of_16" ||
      roundName === "Huitième de finale" ||
      roundName === "1/8"
    ) {
      rounds["Huitième de finale"].push(match);
    } else if (
      roundName === "quarter_final" ||
      roundName === "quarter" ||
      roundName === "Quart de finale" ||
      roundName === "1/4"
    ) {
      rounds["Quart de finale"].push(match);
    } else if (
      roundName === "semi_final" ||
      roundName === "semi" ||
      roundName === "Demi-finale" ||
      roundName === "1/2"
    ) {
      rounds["Demi-finale"].push(match);
    } else if (
      roundName === "final" ||
      roundName === "Finale" ||
      roundName === "1/1"
    ) {
      rounds["Finale"].push(match);
    } else {
      // Par défaut si le tour n'est pas spécifié
      rounds["Huitième de finale"].push(match);
    }
  });

  console.log("ROUNDS MAPPÉS :", rounds);

  const MatchCard = ({ match }) => {
    const p1Name = match.player_one_pseudo || match.player_one_name || "À déterminer";
    const p2Name = match.player_two_pseudo || match.player_two_name || "À déterminer";

    return (
      <div className="match" key={match.id}>
        <p style={{ fontWeight: "bold" }}>{p1Name}</p>
        <span>{match.score || "VS"}</span>
        <p style={{ fontWeight: "bold" }}>{p2Name}</p>

        {match.status !== "finished" && match.status !== "completed" && match.player_one && (
          <button onClick={() => finishMatch(match.id, match.player_one)}>
            Gagnant : {p1Name}
          </button>
        )}

        {match.status !== "finished" && match.status !== "completed" && match.player_two && (
          <button onClick={() => finishMatch(match.id, match.player_two)}>
            Gagnant : {p2Name}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="bracket-page">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px" }}>
        <Link to="/dashboard" style={{ color: "#38bdf8", textDecoration: "none" }}>
          ← Retour au tableau de bord
        </Link>
        <h1>🏆 ArenaFoot Tournament</h1>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#aaa" }}>
          ⏳ Chargement du bracket...
        </div>
      ) : matches.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "#aaa" }}>
          Aucun match n'a encore été généré pour ce tournoi.
        </div>
      ) : (
        <div className="bracket">
          {/* Huitièmes */}
          <div className="round">
            <h2>8e Finale ({rounds["Huitième de finale"].length})</h2>
            {rounds["Huitième de finale"].map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>

          {/* Quarts */}
          <div className="round">
            <h2>Quart ({rounds["Quart de finale"].length})</h2>
            {rounds["Quart de finale"].length > 0 ? (
              rounds["Quart de finale"].map((match) => (
                <MatchCard key={match.id} match={match} />
              ))
            ) : (
              <p className="empty-round">En attente des vainqueurs 8e</p>
            )}
          </div>

          {/* Demi */}
          <div className="round">
            <h2>Demi ({rounds["Demi-finale"].length})</h2>
            {rounds["Demi-finale"].length > 0 ? (
              rounds["Demi-finale"].map((match) => (
                <MatchCard key={match.id} match={match} />
              ))
            ) : (
              <p className="empty-round">En attente des vainqueurs Quarts</p>
            )}
          </div>

          {/* Finale */}
          <div className="round finale">
            <h2>Finale 🏆 ({rounds["Finale"].length})</h2>
            {rounds["Finale"].length > 0 ? (
              rounds["Finale"].map((match) => {
                const p1Name = match.player_one_pseudo || match.player_one_name || "À déterminer";
                const p2Name = match.player_two_pseudo || match.player_two_name || "À déterminer";

                return (
                  <div className="match champion" key={match.id}>
                    <p>{p1Name}</p>
                    <span>{match.score || "VS"}</span>
                    <p>{p2Name}</p>

                    {match.winner && (
                      <h3>
                        👑{" "}
                        {match.winner === match.player_one ? p1Name : p2Name}
                      </h3>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="empty-round">En attente des 2 finalistes</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Bracket;