import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/admin/Sidebar";
import {
    getRewards,
    sendReward
} from "../service/adminService";

import "../styles/admin.css";

function AdminRewards() {

    const [rewards, setRewards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(null);

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    const [selectedReward, setSelectedReward] = useState(null);


    useEffect(() => {
        loadRewards();
    }, []);


    const loadRewards = async () => {

        try {

            setLoading(true);

            const data = await getRewards();

            console.log("REWARDS :", data);

            setRewards(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (error) {

            console.error(
                "Erreur chargement récompenses :",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    const handleSendReward = async (id) => {

        try {

            setSending(id);

            const data = await sendReward(id);

            alert(data.message);

            setSelectedReward(null);

            await loadRewards();

        } catch (error) {

            console.error(
                "Erreur envoi récompense :",
                error
            );

            alert(
                "Erreur lors de l'envoi de la récompense."
            );

        } finally {

            setSending(null);

        }

    };


    const filteredRewards = useMemo(() => {

        const value =
            search.toLowerCase().trim();

        return rewards.filter((reward) => {

            const matchesSearch =
                !value ||
                reward.pseudo
                    ?.toLowerCase()
                    .includes(value) ||
                reward.tournament
                    ?.toLowerCase()
                    .includes(value) ||
                reward.phone
                    ?.toLowerCase()
                    .includes(value);


            const matchesFilter =
                filter === "all" ||
                reward.status === filter;


            return (
                matchesSearch &&
                matchesFilter
            );

        });

    }, [rewards, search, filter]);


    const waitingRewards =
        rewards.filter(
            reward =>
                reward.status === "waiting"
        );


    const sentRewards =
        rewards.filter(
            reward =>
                reward.status !== "waiting"
        );


    const totalRewards =
        rewards.reduce(
            (total, reward) =>
                total +
                Number(reward.amount || 0),
            0
        );


    const waitingAmount =
        waitingRewards.reduce(
            (total, reward) =>
                total +
                Number(reward.amount || 0),
            0
        );


    const formatMoney = (amount) => {

        return Number(amount || 0)
            .toLocaleString("fr-FR");

    };


    const getStatus = (status) => {

        if (status === "waiting") {

            return {
                label: "En attente",
                className: "reward-waiting"
            };

        }

        return {
            label: "Envoyée",
            className: "reward-sent"
        };

    };


    return (

        <div className="admin-page">

            <Sidebar />


            <main className="admin-content rewards-page">


                {/* =================================
                    HEADER
                ================================= */}

                <div className="rewards-header">

                    <div>

                        <div className="admin-eyebrow">
                            ARENAFOOT REWARDS
                        </div>

                        <h1>
                            🏆 Gestion des récompenses
                        </h1>

                        <p>
                            Gérez les gains des joueurs
                            et les paiements des vainqueurs.
                        </p>

                    </div>


                    <button
                        className="rewards-refresh"
                        onClick={loadRewards}
                    >
                        ↻ Actualiser
                    </button>

                </div>


                {/* =================================
                    STATISTIQUES
                ================================= */}

                <div className="rewards-stats">


                    <div className="reward-stat-card">

                        <div className="reward-stat-icon blue">
                            🏆
                        </div>

                        <div>

                            <span>
                                Récompenses
                            </span>

                            <strong>
                                {rewards.length}
                            </strong>

                        </div>

                    </div>


                    <div className="reward-stat-card">

                        <div className="reward-stat-icon orange">
                            ◷
                        </div>

                        <div>

                            <span>
                                En attente
                            </span>

                            <strong>
                                {waitingRewards.length}
                            </strong>

                        </div>

                    </div>


                    <div className="reward-stat-card">

                        <div className="reward-stat-icon green">
                            ✓
                        </div>

                        <div>

                            <span>
                                Envoyées
                            </span>

                            <strong>
                                {sentRewards.length}
                            </strong>

                        </div>

                    </div>


                    <div className="reward-stat-card">

                        <div className="reward-stat-icon purple">
                            💰
                        </div>

                        <div>

                            <span>
                                Gains distribués
                            </span>

                            <strong>
                                {formatMoney(totalRewards)}
                                {" "}
                                <small>FCFA</small>
                            </strong>

                        </div>

                    </div>

                </div>


                {/* =================================
                    ALERTE PAIEMENTS EN ATTENTE
                ================================= */}

                {waitingRewards.length > 0 && (

                    <div className="reward-alert">

                        <div className="reward-alert-icon">
                            ⚠️
                        </div>

                        <div>

                            <strong>
                                {waitingRewards.length}
                                {" "}
                                récompense
                                {waitingRewards.length > 1
                                    ? "s"
                                    : ""
                                }
                                {" "}
                                en attente
                            </strong>

                            <p>
                                {formatMoney(waitingAmount)}
                                {" "}
                                FCFA doivent encore être envoyés.
                            </p>

                        </div>

                    </div>

                )}


                {/* =================================
                    TOOLBAR
                ================================= */}

                <div className="rewards-toolbar">


                    <div className="rewards-search">

                        <span>
                            🔎
                        </span>

                        <input
                            type="text"
                            placeholder="Rechercher un joueur, tournoi ou téléphone..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                        {search && (

                            <button
                                onClick={() =>
                                    setSearch("")
                                }
                            >
                                ✕
                            </button>

                        )}

                    </div>


                    <div className="rewards-filters">

                        <button
                            className={
                                filter === "all"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setFilter("all")
                            }
                        >
                            Toutes
                        </button>


                        <button
                            className={
                                filter === "waiting"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setFilter("waiting")
                            }
                        >
                            ◷ En attente
                        </button>


                        <button
                            className={
                                filter !== "all" &&
                                filter !== "waiting"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setFilter("sent")
                            }
                        >
                            ✓ Envoyées
                        </button>

                    </div>

                </div>


                {/* =================================
                    PANEL
                ================================= */}

                <section className="rewards-panel">


                    <div className="rewards-panel-header">

                        <div>

                            <h2>
                                💰 Paiement des gains
                            </h2>

                            <p>
                                {filteredRewards.length}
                                {" "}
                                récompense
                                {filteredRewards.length > 1
                                    ? "s"
                                    : ""
                                }
                            </p>

                        </div>


                        <div className="rewards-secure">
                            🔐 Gestion sécurisée
                        </div>

                    </div>


                    {loading ? (

                        <div className="rewards-loading">

                            <div className="loading-spinner"></div>

                            <p>
                                Chargement des récompenses...
                            </p>

                        </div>

                    ) : filteredRewards.length === 0 ? (

                        <div className="rewards-empty">

                            <div>
                                🏆
                            </div>

                            <h3>
                                Aucune récompense
                            </h3>

                            <p>
                                Aucune récompense ne correspond
                                à votre recherche.
                            </p>

                        </div>

                    ) : (

                        <div className="rewards-grid">

                            {filteredRewards.map(
                                (reward, index) => {

                                    const status =
                                        getStatus(
                                            reward.status
                                        );

                                    return (

                                        <article
                                            key={reward.id}
                                            className="reward-card"
                                            style={{
                                                animationDelay:
                                                    `${index * 50}ms`
                                            }}
                                        >


                                            <div className="reward-card-top">

                                                <span className="reward-number">
                                                    GAIN #
                                                    {reward.id}
                                                </span>


                                                <span
                                                    className={
                                                        `reward-status ${status.className}`
                                                    }
                                                >
                                                    {status.label}
                                                </span>

                                            </div>


                                            {/* MONTANT */}

                                            <div className="reward-amount-box">

                                                <span>
                                                    MONTANT DU GAIN
                                                </span>

                                                <strong>
                                                    {formatMoney(
                                                        reward.amount
                                                    )}
                                                    <small>
                                                        {" "}
                                                        FCFA
                                                    </small>
                                                </strong>

                                            </div>


                                            {/* JOUEUR */}

                                            <div className="reward-player">

                                                <div className="reward-avatar">

                                                    {
                                                        reward.pseudo
                                                            ?.charAt(0)
                                                            ?.toUpperCase()
                                                        ||
                                                        "?"
                                                    }

                                                </div>


                                                <div>

                                                    <span>
                                                        VAINQUEUR
                                                    </span>

                                                    <strong>
                                                        {
                                                            reward.pseudo
                                                            ||
                                                            "Joueur"
                                                        }
                                                    </strong>

                                                </div>

                                            </div>


                                            {/* INFOS */}

                                            <div className="reward-info">


                                                <div>

                                                    <span>
                                                        🏆 Tournoi
                                                    </span>

                                                    <strong>
                                                        {
                                                            reward.tournament
                                                            ||
                                                            "Tournoi"
                                                        }
                                                    </strong>

                                                </div>


                                                <div>

                                                    <span>
                                                        📱 Téléphone
                                                    </span>

                                                    <strong>
                                                        {
                                                            reward.phone
                                                            ||
                                                            "—"
                                                        }
                                                    </strong>

                                                </div>


                                                <div>

                                                    <span>
                                                        📌 Statut
                                                    </span>

                                                    <strong>
                                                        {
                                                            status.label
                                                        }
                                                    </strong>

                                                </div>

                                            </div>


                                            {/* ACTIONS */}

                                            <div className="reward-actions">


                                                <button
                                                    className="reward-details-button"
                                                    onClick={() =>
                                                        setSelectedReward(
                                                            reward
                                                        )
                                                    }
                                                >
                                                    👁 Détails
                                                </button>


                                                {reward.status ===
                                                    "waiting" && (

                                                    <button
                                                        className="reward-send-button"
                                                        disabled={
                                                            sending ===
                                                            reward.id
                                                        }
                                                        onClick={() =>
                                                            setSelectedReward(
                                                                reward
                                                            )
                                                        }
                                                    >

                                                        {sending ===
                                                        reward.id
                                                            ? "⏳..."
                                                            : "📤 Envoyer"
                                                        }

                                                    </button>

                                                )}

                                            </div>

                                        </article>

                                    );

                                }
                            )}

                        </div>

                    )}

                </section>

            </main>


            {/* =================================
                MODAL
            ================================= */}

            {selectedReward && (

                <div
                    className="reward-modal-overlay"
                    onClick={() =>
                        setSelectedReward(null)
                    }
                >

                    <div
                        className="reward-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <button
                            className="reward-modal-close"
                            onClick={() =>
                                setSelectedReward(null)
                            }
                        >
                            ✕
                        </button>


                        <div className="reward-modal-icon">
                            🏆
                        </div>


                        <h2>
                            Récompense du joueur
                        </h2>


                        <div className="reward-modal-amount">

                            <span>
                                MONTANT
                            </span>

                            <strong>
                                {formatMoney(
                                    selectedReward.amount
                                )}
                                {" "}
                                FCFA
                            </strong>

                        </div>


                        <div className="reward-modal-info">

                            <div>
                                <span>
                                    👤 Joueur
                                </span>

                                <strong>
                                    {
                                        selectedReward.pseudo
                                    }
                                </strong>
                            </div>


                            <div>
                                <span>
                                    🏆 Tournoi
                                </span>

                                <strong>
                                    {
                                        selectedReward.tournament
                                    }
                                </strong>
                            </div>


                            <div>
                                <span>
                                    📱 Téléphone
                                </span>

                                <strong>
                                    {
                                        selectedReward.phone
                                    }
                                </strong>
                            </div>


                            <div>
                                <span>
                                    📌 Statut
                                </span>

                                <strong>
                                    {
                                        selectedReward.status ===
                                        "waiting"
                                            ? "◷ En attente"
                                            : "✓ Envoyée"
                                    }
                                </strong>
                            </div>

                        </div>


                        {selectedReward.status ===
                            "waiting" && (

                            <button
                                className="modal-send-reward"
                                disabled={
                                    sending ===
                                    selectedReward.id
                                }
                                onClick={() =>
                                    handleSendReward(
                                        selectedReward.id
                                    )
                                }
                            >

                                {sending ===
                                selectedReward.id
                                    ? "⏳ Envoi en cours..."
                                    : "📤 Envoyer la récompense"
                                }

                            </button>

                        )}

                    </div>

                </div>

            )}

        </div>

    );

}

export default AdminRewards;