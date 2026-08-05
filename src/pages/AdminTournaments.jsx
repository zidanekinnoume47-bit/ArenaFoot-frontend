import React, { useEffect, useState } from "react";
import Sidebar from "../components/admin/Sidebar";
import {
  getTournaments,
  deleteTournament,
  getTournamentPlayers,
  createTestPlayers
} from "../service/adminService";

function AdminTournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [players, setPlayers] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState(null);
  const [loadingTournamentId, setLoadingTournamentId] = useState(null);

  useEffect(() => {
    loadTournaments();
  }, []);

  const loadTournaments = async () => {
    const data = await getTournaments();
    setTournaments(Array.isArray(data) ? data : []);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce tournoi ?")) return;

    const data = await deleteTournament(id);

    alert(data.message);

    loadTournaments();
  };

  const handlePlayers = async (id) => {
    console.log("Tournoi :", id);

    const data = await getTournamentPlayers(id);

    console.log("JOUEURS :", data);

    setPlayers(Array.isArray(data) ? data : []);

    setSelectedTournament(id);
  };

  // Fonction pour injecter 15 joueurs de test payés
  const handleAddTestPlayers = async (tournamentId) => {
    if (
      !window.confirm(
        "Voulez-vous simuler l'ajout de 15 joueurs de test payés pour ce tournoi ?"
      )
    ) {
      return;
    }

    setLoadingTournamentId(tournamentId);

    try {
      const res = await createTestPlayers(tournamentId);
      alert(res.message || "Joueurs de test ajoutés avec succès ! 🏆");
      
      // Recharger la liste des joueurs si ce tournoi était ouvert
      await handlePlayers(tournamentId);
      await loadTournaments();
    } catch (err) {
      console.error("Erreur simulation :", err);
      alert("❌ Une erreur est survenue lors de l'ajout des joueurs.");
    } finally {
      setLoadingTournamentId(null);
    }
  };

  return (
    <div className="admin-page">
      <Sidebar />

      <div style={{ marginLeft: "280px", padding: "20px" }}>
        <h1>🏆 Gestion des tournois</h1>

        {tournaments.map((t) => {
          // Compter les joueurs inscrits si les participants sont chargés
          const isSelected = selectedTournament === t.id;
          const paidCount = isSelected
            ? players.filter((p) => p.payment_status === "paid").length
            : null;
          const isFull = paidCount !== null && paidCount >= 16;

          return (
            <div
              key={t.id}
              style={{
                border: isFull ? "2px solid #ef4444" : "1px solid #ddd",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "8px",
                backgroundColor: isFull ? "#fef2f2" : "#ffffff"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3>{t.name}</h3>
                {isFull && (
                  <span
                    style={{
                      backgroundColor: "#ef4444",
                      color: "white",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontWeight: "bold",
                      fontSize: "0.85rem"
                    }}
                  >
                    COMPLET (16/16)
                  </span>
                )}
              </div>

              <p>Participation : {t.entry_fee} FCFA</p>

              <p>Récompense : {t.reward} FCFA</p>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "10px" }}>
                <button onClick={() => handlePlayers(t.id)}>
                  👥 Participants {isSelected ? `(${players.length})` : ""}
                </button>

                <button>🏆 Bracket</button>

                <button>✏ Modifier</button>

                {/* BOUTON TEST POUR INJECTER LES 15 JOUEURS */}
                <button
                  onClick={() => handleAddTestPlayers(t.id)}
                  disabled={loadingTournamentId === t.id}
                  style={{
                    backgroundColor: "#8b5cf6",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}
                >
                  {loadingTournamentId === t.id
                    ? "⏳ Inscription en cours..."
                    : "🧪 Ajouter 15 Joueurs Test"}
                </button>

                <button
                  onClick={() => handleDelete(t.id)}
                  style={{ backgroundColor: "#dc2626", color: "white", border: "none", borderRadius: "4px" }}
                >
                  🗑 Supprimer
                </button>
              </div>

              {/* TABLEAU DES PARTICIPANTS */}
              {selectedTournament === t.id && (
                <div style={{ marginTop: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3>
                      Participants ({players.length}/16)
                    </h3>
                    <span
                      style={{
                        fontWeight: "bold",
                        color: paidCount >= 16 ? "#dc2626" : "#16a34a"
                      }}
                    >
                      {paidCount} Joueurs Payés
                    </span>
                  </div>

                  <table className="admin-table" style={{ width: "100%", marginTop: "10px" }}>
                    <thead>
                      <tr>
                        <th>Nom</th>
                        <th>Pseudo</th>
                        <th>Téléphone</th>
                        <th>Paiement</th>
                      </tr>
                    </thead>

                    <tbody>
                      {players.map((p) => (
                        <tr key={p.id}>
                          <td>{p.name}</td>
                          <td>{p.pseudo}</td>
                          <td>{p.phone}</td>
                          <td>
                            <span
                              style={{
                                padding: "3px 8px",
                                borderRadius: "4px",
                                backgroundColor:
                                  p.payment_status === "paid"
                                    ? "#dcfce7"
                                    : "#fef3c7",
                                color:
                                  p.payment_status === "paid"
                                    ? "#166534"
                                    : "#92400e",
                                fontWeight: "bold"
                              }}
                            >
                              {p.payment_status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AdminTournaments;