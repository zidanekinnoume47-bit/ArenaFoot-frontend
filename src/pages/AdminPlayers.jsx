import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/admin/Sidebar";

import {
    getPlayers,
    getPlayer,
    banPlayer,
    deletePlayer
} from "../service/adminService";

import "../styles/admin.css";

function AdminPlayers() {

    const [players, setPlayers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    useEffect(() => {

        loadPlayers();

    }, []);


    const loadPlayers = async () => {

        try {

            setLoading(true);

            const data = await getPlayers();

            setPlayers(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (error) {

            console.error(
                "Erreur chargement joueurs :",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    const handleView = async (id) => {

        try {

            const player = await getPlayer(id);

            setSelectedPlayer(player);

        } catch (error) {

            console.error(
                "Erreur récupération joueur :",
                error
            );

        }

    };


    const handleBan = async (id) => {

        if (!window.confirm("Bannir ce joueur ?")) {
            return;
        }

        try {

            const data = await banPlayer(id);

            alert(data.message);

            loadPlayers();

        } catch (error) {

            console.error(error);

            alert("Erreur lors du bannissement.");

        }

    };


    const handleDelete = async (id) => {

        if (
            !window.confirm(
                "Supprimer définitivement ce joueur ?"
            )
        ) {
            return;
        }

        try {

            const data = await deletePlayer(id);

            alert(data.message);

            loadPlayers();

        } catch (error) {

            console.error(error);

            alert("Erreur lors de la suppression.");

        }

    };


    const filteredPlayers = useMemo(() => {

        const value =
            search
                .toLowerCase()
                .trim();

        if (!value) {
            return players;
        }

        return players.filter((player) =>

            player.name
                ?.toLowerCase()
                .includes(value)

            ||

            player.pseudo
                ?.toLowerCase()
                .includes(value)

            ||

            player.email
                ?.toLowerCase()
                .includes(value)

        );

    }, [players, search]);


    return (

        <div className="admin-page">

            <Sidebar />


            <main className="admin-content players-page">

                {/* =================================
                    HEADER
                ================================= */}

                <div className="players-header">

                    <div>

                        <div className="admin-eyebrow">
                            ARENAFOOT CONTROL
                        </div>

                        <h1>
                            Gestion des joueurs
                        </h1>

                        <p>
                            Gérez les comptes et les accès
                            des joueurs ArenaFoot.
                        </p>

                    </div>


                    <div className="players-counter">

                        <span>
                            👥
                        </span>

                        <div>

                            <strong>
                                {players.length}
                            </strong>

                            <small>
                                joueurs
                            </small>

                        </div>

                    </div>

                </div>


                {/* =================================
                    STATISTIQUES
                ================================= */}

                <div className="players-stats">

                    <div className="players-stat-card">

                        <div className="stat-icon blue">
                            👥
                        </div>

                        <div>

                            <span>
                                Total joueurs
                            </span>

                            <strong>
                                {players.length}
                            </strong>

                        </div>

                    </div>


                    <div className="players-stat-card">

                        <div className="stat-icon green">
                            🟢
                        </div>

                        <div>

                            <span>
                                Comptes joueurs
                            </span>

                            <strong>
                                {
                                    players.filter(
                                        p => p.role === "player"
                                    ).length
                                }
                            </strong>

                        </div>

                    </div>


                    <div className="players-stat-card">

                        <div className="stat-icon purple">
                            👑
                        </div>

                        <div>

                            <span>
                                Administrateurs
                            </span>

                            <strong>
                                {
                                    players.filter(
                                        p => p.role === "admin"
                                    ).length
                                }
                            </strong>

                        </div>

                    </div>

                </div>


                {/* =================================
                    SEARCH
                ================================= */}

                <div className="players-toolbar">

                    <div className="players-search">

                        <span>
                            🔎
                        </span>

                        <input
                            type="text"
                            placeholder="Rechercher un joueur, pseudo ou email..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />

                        {search && (

                            <button
                                type="button"
                                onClick={() => setSearch("")}
                            >
                                ✕
                            </button>

                        )}

                    </div>


                    <div className="results-count">

                        {filteredPlayers.length}
                        {" "}
                        résultat
                        {filteredPlayers.length > 1
                            ? "s"
                            : ""
                        }

                    </div>

                </div>


                {/* =================================
                    TABLEAU
                ================================= */}

                <section className="players-panel">

                    <div className="panel-header">

                        <div>

                            <h2>
                                Tous les joueurs
                            </h2>

                            <p>
                                Liste des comptes enregistrés
                            </p>

                        </div>

                        <span className="live-indicator">
                            <i></i>
                            En ligne
                        </span>

                    </div>


                    {loading ? (

                        <div className="players-loading">

                            <div className="loading-spinner"></div>

                            <p>
                                Chargement des joueurs...
                            </p>

                        </div>

                    ) : filteredPlayers.length === 0 ? (

                        <div className="players-empty">

                            <div>
                                🔍
                            </div>

                            <h3>
                                Aucun joueur trouvé
                            </h3>

                            <p>
                                Essayez avec un autre nom,
                                pseudo ou email.
                            </p>

                        </div>

                    ) : (

                        <div className="players-table-wrapper">

                            <table className="players-table">

                                <thead>

                                    <tr>

                                        <th>
                                            Joueur
                                        </th>

                                        <th>
                                            Email
                                        </th>

                                        <th>
                                            Téléphone
                                        </th>

                                        <th>
                                            Rôle
                                        </th>

                                        <th>
                                            Actions
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {filteredPlayers.map(
                                        (player, index) => (

                                            <tr
                                                key={player.id}
                                                style={{
                                                    animationDelay:
                                                        `${index * 40}ms`
                                                }}
                                            >

                                                <td>

                                                    <div className="player-identity">

                                                        <div className="player-avatar">

                                                            {
                                                                player.pseudo
                                                                    ?.charAt(0)
                                                                    ?.toUpperCase()
                                                                    || "?"
                                                            }

                                                        </div>

                                                        <div>

                                                            <strong>
                                                                {
                                                                    player.name
                                                                    ||
                                                                    "Sans nom"
                                                                }
                                                            </strong>

                                                            <span>
                                                                @
                                                                {
                                                                    player.pseudo
                                                                }
                                                            </span>

                                                        </div>

                                                    </div>

                                                </td>


                                                <td>

                                                    <span className="player-email">
                                                        {player.email}
                                                    </span>

                                                </td>


                                                <td>

                                                    {player.phone || "—"}

                                                </td>


                                                <td>

                                                    <span
                                                        className={
                                                            player.role === "admin"
                                                                ? "role-badge admin"
                                                                : "role-badge player"
                                                        }
                                                    >

                                                        {player.role === "admin"
                                                            ? "👑 Admin"
                                                            : "🎮 Joueur"
                                                        }

                                                    </span>

                                                </td>


                                                <td>

                                                    <div className="player-actions">

                                                        <button
                                                            className="action-view"
                                                            onClick={() =>
                                                                handleView(
                                                                    player.id
                                                                )
                                                            }
                                                        >
                                                            👁
                                                            <span>
                                                                Voir
                                                            </span>
                                                        </button>


                                                        <button
                                                            className="action-edit"
                                                        >
                                                            ✏️
                                                            <span>
                                                                Modifier
                                                            </span>
                                                        </button>


                                                        <button
                                                            className="action-ban"
                                                            onClick={() =>
                                                                handleBan(
                                                                    player.id
                                                                )
                                                            }
                                                        >
                                                            🚫
                                                            <span>
                                                                Bannir
                                                            </span>
                                                        </button>


                                                        <button
                                                            className="action-delete"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    player.id
                                                                )
                                                            }
                                                        >
                                                            🗑️
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    )}

                </section>


            </main>


            {/* =================================
                MODAL PROFIL
            ================================= */}

            {selectedPlayer && (

                <div
                    className="player-modal-overlay"
                    onClick={() =>
                        setSelectedPlayer(null)
                    }
                >

                    <div
                        className="player-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <button
                            className="modal-close"
                            onClick={() =>
                                setSelectedPlayer(null)
                            }
                        >
                            ✕
                        </button>


                        <div className="modal-avatar">

                            {
                                selectedPlayer.pseudo
                                    ?.charAt(0)
                                    ?.toUpperCase()
                                    || "?"
                            }

                        </div>


                        <h2>
                            {selectedPlayer.name}
                        </h2>

                        <p className="modal-pseudo">
                            @{selectedPlayer.pseudo}
                        </p>


                        <div className="modal-info">

                            <div>
                                <span>
                                    📧 Email
                                </span>

                                <strong>
                                    {selectedPlayer.email}
                                </strong>
                            </div>


                            <div>
                                <span>
                                    📱 Téléphone
                                </span>

                                <strong>
                                    {
                                        selectedPlayer.phone
                                        || "Non renseigné"
                                    }
                                </strong>
                            </div>


                            <div>
                                <span>
                                    🎮 eFootball ID
                                </span>

                                <strong>
                                    {
                                        selectedPlayer.efootball_id
                                        || "Non renseigné"
                                    }
                                </strong>
                            </div>


                            <div>
                                <span>
                                    🛡️ Rôle
                                </span>

                                <strong>
                                    {selectedPlayer.role}
                                </strong>
                            </div>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}

export default AdminPlayers;