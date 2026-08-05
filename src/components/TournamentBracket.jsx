import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function TournamentBracket() {
  const { id } = useParams();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBracketData();
  }, [id]);

  const fetchBracketData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://arenafoot-backend-production.up.railway.app/api/admin/tournament/${id}/bracket`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error("Impossible de charger le bracket");
      }

      const data = await response.json();
      setMatches(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Erreur chargement bracket:", err);
      setError("Erreur lors de la rÃ©cupÃ©ration de l'arbre du tournoi.");
    } finally {
      setLoading(false);
    }
  };

  // Filtrer les matchs par tour
  const roundOf16Matches = matches.filter((m) => m.round === "round_of_16");
  const quarterMatches = matches.filter((m) => m.round === "quarter_final" || m.round === "quarter");
  const semiMatches = matches.filter((m) => m.round === "semi_final" || m.round === "semi");
  const finalMatches = matches.filter((m) => m.round === "final");

  // Rendu de chaque carte de match
  const renderMatchCard = (match, index) => {
    const p1 = match.player_one_pseudo || "Ã dÃ©terminer";
    const p2 = match.player_two_pseudo || "Ã dÃ©terminer";
    const isFinished = match.status === "completed" || match.status === "finished";

    return (
      <div
        key={match.id || index}
        style={{
          backgroundColor: "#1e293b",
          border: "1px solid #334155",
          borderRadius: "8px",
          padding: "12px",
          marginBottom: "15px",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.3)",
          transition: "all 0.2s ease"
        }}
      >
        <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginBottom: "8px", textTransform: "uppercase", fontWeight: "bold" }}>
          Match #{index + 1} â¢ {match.status === "pending" ? "â³ En attente" : "ð® TerminÃ©"}
        </div>

        {/* Joueur 1 */}
        <div
          style={{
            display: "flex",
            justify: "space-between",
            alignItems: "center",
            padding: "8px 10px",
            backgroundColor: match.winner === match.player_one && match.player_one ? "#15803d" : "#0f172a",
            borderRadius: "4px",
            marginBottom: "6px",
            borderLeft: match.winner === match.player_one && match.player_one ? "4px solid #22c55e" : "4px solid transparent"
          }}
        >
          <span style={{ color: "#f8fafc", fontWeight: "600", fontSize: "0.9rem" }}>{p1}</span>
          {match.winner === match.player_one && match.player_one && (
            <span style={{ fontSize: "0.8rem", color: "#86efac", fontWeight: "bold" }}>ð Vainqueur</span>
          )}
        </div>

        {/* SÃ©parateur VS */}
        <div style={{ textAlign: "center", fontSize: "0.7rem", color: "#64748b", margin: "2px 0", fontWeight: "bold" }}>
          VS
        </div>

        {/* Joueur 2 */}
        <div
          style={{
            display: "flex",
            justify: "space-between",
            alignItems: "center",
            padding: "8px 10px",
            backgroundColor: match.winner === match.player_two && match.player_two ? "#15803d" : "#0f172a",
            borderRadius: "4px",
            borderLeft: match.winner === match.player_two && match.player_two ? "4px solid #22c55e" : "4px solid transparent"
          }}
        >
          <span style={{ color: "#f8fafc", fontWeight: "600", fontSize: "0.9rem" }}>{p2}</span>
          {match.winner === match.player_two && match.player_two && (
            <span style={{ fontSize: "0.8rem", color: "#86efac", fontWeight: "bold" }}>ð Vainqueur</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={{ backgroundColor: "#0f172a", minHeight: "100vh", color: "#ffffff", padding: "30px 20px" }}>
      {/* En-tÃªte */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "1200px", margin: "0 auto 30px auto" }}>
        <div>
          <Link to="/dashboard" style={{ color: "#38bdf8", textDecoration: "none", fontSize: "0.9rem" }}>
            â Retour au tableau de bord
          </Link>
          <h1 style={{ marginTop: "10px", fontSize: "1.8rem" }}>ð Arbre de CompÃ©tition - ArenaFoot</h1>
        </div>
        <button
          onClick={fetchBracketData}
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          ð RafraÃ®chir
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "50px", fontSize: "1.2rem", color: "#94a3b8" }}>
          â³ Chargement du bracket en cours...
        </div>
      ) : error ? (
        <div style={{ textAlign: "center", padding: "30px", backgroundColor: "#7f1d1d", color: "#fca5a5", borderRadius: "8px", maxWidth: "600px", margin: "0 auto" }}>
          {error}
        </div>
      ) : matches.length === 0 ? (
        <div style={{ textAlign: "center", padding: "50px", backgroundColor: "#1e293b", borderRadius: "8px", maxWidth: "600px", margin: "0 auto" }}>
          <h3>Avertissement</h3>
          <p style={{ color: "#94a3b8", marginTop: "10px" }}>
            Le tirage au sort n'a pas encore Ã©tÃ© effectuÃ© par l'administrateur.
          </p>
        </div>
      ) : (
        /* Grille des 4 tours du bracket */
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "20px",
            maxWidth: "1400px",
            margin: "0 auto",
            alignItems: "start"
          }}
        >
          {/* 1/8Ã¨me de Finale */}
          <div>
            <h2 style={{ fontSize: "1.2rem", color: "#fbbf24", marginBottom: "15px", textAlign: "center", borderBottom: "2px solid #fbbf24", paddingBottom: "8px" }}>
              1/8 Finale ({roundOf16Matches.length})
            </h2>
            {roundOf16Matches.length > 0 ? (
              roundOf16Matches.map((m, idx) => renderMatchCard(m, idx))
            ) : (
              <p style={{ color: "#64748b", textAlign: "center" }}>Aucun match</p>
            )}
          </div>

          {/* Quarts de Finale */}
          <div>
            <h2 style={{ fontSize: "1.2rem", color: "#fbbf24", marginBottom: "15px", textAlign: "center", borderBottom: "2px solid #fbbf24", paddingBottom: "8px" }}>
              Quart de Finale ({quarterMatches.length})
            </h2>
            {quarterMatches.length > 0 ? (
              quarterMatches.map((m, idx) => renderMatchCard(m, idx))
            ) : (
              <div style={{ backgroundColor: "#1e293b", borderRadius: "8px", padding: "20px", textAlign: "center", color: "#64748b" }}>
                En attente des vainqueurs des 1/8Ã¨mes
              </div>
            )}
          </div>

          {/* Demi-Finales */}
          <div>
            <h2 style={{ fontSize: "1.2rem", color: "#fbbf24", marginBottom: "15px", textAlign: "center", borderBottom: "2px solid #fbbf24", paddingBottom: "8px" }}>
              Demi-Finale ({semiMatches.length})
            </h2>
            {semiMatches.length > 0 ? (
              semiMatches.map((m, idx) => renderMatchCard(m, idx))
            ) : (
              <div style={{ backgroundColor: "#1e293b", borderRadius: "8px", padding: "20px", textAlign: "center", color: "#64748b" }}>
                En attente des vainqueurs des Quarts
              </div>
            )}
          </div>

          {/* Finale */}
          <div>
            <h2 style={{ fontSize: "1.2rem", color: "#f59e0b", marginBottom: "15px", textAlign: "center", borderBottom: "2px solid #f59e0b", paddingBottom: "8px" }}>
              Finale ð ({finalMatches.length})
            </h2>
            {finalMatches.length > 0 ? (
              finalMatches.map((m, idx) => renderMatchCard(m, idx))
            ) : (
              <div style={{ backgroundColor: "#1e293b", borderRadius: "8px", padding: "20px", textAlign: "center", color: "#64748b" }}>
                En attente des 2 finalistes
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TournamentBracket;