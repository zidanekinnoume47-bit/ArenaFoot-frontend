import React, { useEffect, useState } from "react";
import { getRewards, sendReward } from "../service/adminService";

function AdminRewards() {

    const [rewards, setRewards] = useState([]);

    useEffect(() => {
        loadRewards();
    }, []);

    const loadRewards = async () => {
        const data = await getRewards();
        setRewards(Array.isArray(data) ? data : []);
    };

    const handleSendReward = async (id) => {

        const data = await sendReward(id);

        alert(data.message);

        loadRewards();

    };

    return (

        <div style={{ padding: "30px" }}>

            <h1>🏆 Gestion des récompenses</h1>

            {
                rewards.length === 0 ? (

                    <p>Aucune récompense disponible.</p>

                ) : (

                    rewards.map((reward) => (

                        <div
                            key={reward.id}
                            style={{
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                padding: "15px",
                                marginBottom: "15px"
                            }}
                        >

                            <p><strong>👤 Joueur :</strong> {reward.pseudo}</p>

                            <p><strong>🏆 Tournoi :</strong> {reward.tournament}</p>

                            <p><strong>💰 Montant :</strong> {reward.amount} FCFA</p>

                            <p><strong>📱 Téléphone :</strong> {reward.phone}</p>

                            <p><strong>📌 Statut :</strong> {reward.status}</p>

                            {
                                reward.status === "waiting" && (

                                    <button
                                        onClick={() => handleSendReward(reward.id)}
                                    >
                                        📤 Envoyer
                                    </button>

                                )
                            }

                        </div>

                    ))

                )
            }

        </div>

    );

}

export default AdminRewards;