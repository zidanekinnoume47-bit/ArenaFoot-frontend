import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTournament } from "../service/adminService";
import "../styles/createTournament.css";

function CreateTournament() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        game: "call_of_duty",
        name: "",
        entry_fee: "4000",
        reward: "",
        players_limit: 32,
        description: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    };

    const handleGameChange = (e) => {

        const game = e.target.value;

        setFormData((prev) => ({

            ...prev,

            game,

            entry_fee:
                game === "call_of_duty"
                    ? "4000"
                    : "",

            players_limit:
                game === "call_of_duty"
                    ? 32
                    : 16

        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!formData.name.trim()) {
            alert("Veuillez entrer le nom du tournoi.");
            return;
        }

        if (!formData.reward) {
            alert("Veuillez entrer la récompense.");
            return;
        }

        setLoading(true);

        try {

            const data = await createTournament({

                name: formData.name,

                entry_fee: Number(formData.entry_fee),

                reward: Number(formData.reward),

                players_limit:
                    Number(formData.players_limit),

                description:
                    formData.description,

                game: formData.game

            });

            if (data.tournament_id) {

                alert("🏆 Tournoi créé avec succès !");

                navigate("/admin");

            } else {

                alert(
                    data.message ||
                    "Erreur lors de la création du tournoi"
                );

            }

        } catch (error) {

            console.error(
                "Erreur création tournoi :",
                error
            );

            alert(
                "Erreur lors de la création du tournoi."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="create-tournament-page">

            <div className="create-tournament-card">

                <h1>
                    🏆 Créer un tournoi
                </h1>

                <p className="subtitle">
                    Crée une nouvelle compétition ArenaFoot
                </p>


                <form onSubmit={handleSubmit}>

                    {/* JEU */}

                    <label>
                        🎮 Jeu
                    </label>

                    <select
                        name="game"
                        value={formData.game}
                        onChange={handleGameChange}
                    >

                        <option value="call_of_duty">
                            🔫 Call of Duty
                        </option>

                        <option value="efootball">
                            ⚽ eFootball
                        </option>

                    </select>


                    {/* NOM */}

                    <label>
                        🏆 Nom du tournoi
                    </label>

                    <input
                        type="text"
                        name="name"
                        placeholder="Ex : ArenaFoot Call of Duty #1"
                        value={formData.name}
                        onChange={handleChange}
                    />


                    {/* PARTICIPATION */}

                    <label>
                        💰 Participation
                    </label>

                    <input
                        type="number"
                        name="entry_fee"
                        min="0"
                        value={formData.entry_fee}
                        onChange={handleChange}
                    />


                    {/* RÉCOMPENSE */}

                    <label>
                        🎁 Récompense
                    </label>

                    <input
                        type="number"
                        name="reward"
                        min="0"
                        placeholder="Ex : 100000"
                        value={formData.reward}
                        onChange={handleChange}
                    />


                    {/* JOUEURS */}

                    <label>
                        👥 Nombre de joueurs
                    </label>

                    <input
                        type="number"
                        name="players_limit"
                        value={formData.players_limit}
                        disabled={
                            formData.game === "call_of_duty"
                        }
                        onChange={handleChange}
                    />

                    {formData.game === "call_of_duty" && (

                        <p className="info-message">
                            🔫 Un tournoi Call of Duty ArenaFoot
                            nécessite 32 joueurs.
                        </p>

                    )}


                    {/* DESCRIPTION */}

                    <label>
                        📝 Description
                    </label>

                    <textarea
                        name="description"
                        placeholder="Description du tournoi..."
                        value={formData.description}
                        onChange={handleChange}
                        rows="5"
                    />


                    {/* BOUTON */}

                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {loading
                            ? "⏳ Création..."
                            : "🏆 Créer le tournoi"
                        }

                    </button>

                </form>

            </div>

        </div>

    );

}

export default CreateTournament;