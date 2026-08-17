import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Sidebar from "../components/admin/Sidebar";

const API = import.meta.env.VITE_API_URL;

function AdminMatches() {

    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");


    useEffect(() => {
        loadMatches();
    }, []);


    const loadMatches = async () => {

        try {

            setLoading(true);

            const response = await axios.get(
                `${API}/api/matches`
            );

            setMatches(
                Array.isArray(response.data)
                    ? response.data
                    : []
            );

        } catch (error) {

            console.error(
                "Erreur chargement matchs :",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    const filteredMatches = useMemo(() => {

        const value = search
            .toLowerCase()
            .trim();

        return matches.filter((match) => {

            const matchesSearch =
                !value ||
                match.player_one_name
                    ?.toLowerCase()
                    .includes(value) ||
                match.player_two_name
                    ?.toLowerCase()
                    .includes(value) ||
                match.tournament_name
                    ?.toLowerCase()
                    .includes(value);

            const matchesStatus =
                filter === "all" ||
                match.status === filter;

            return matchesSearch && matchesStatus;

        });

    }, [matches, search, filter]);


    const totalMatches = matches.length;

    const finishedMatches = matches.filter(
        match =>
            match.status === "finished"
    ).length;

    const pendingMatches = matches.filter(
        match =>
            match.status !== "finished"
    ).length;


    const getStatus = (status) => {

        if (status === "finished") {

            return {
                label: "Terminé",
                className: "match-finished",
                icon: "✓"
            };

        }

        if (status === "playing") {

            return {
                label: "En cours",
                className: "match-playing",
                icon: "●"
            };

        }

        return {
            label: "En attente",
            className: "match-pending",
            icon: "◷"
        };

    };


    return (

        <div className="admin-page">

            <Sidebar />


            <main className="admin-content matches-page">


                {/* =================================
                    HEADER
                ================================= */}

                <div className="matches-header">

                    <div>

                        <div className="admin-eyebrow">
                            ARENAFOOT CONTROL
                        </div>

                        <h1>
                            ⚽ Gestion des matchs
                        </h1>

                        <p>
                            Supervisez les rencontres
                            de tous vos tournois.
                        </p>

                    </div>


                    <button
                        className="matches-refresh"
                        onClick={loadMatches}
                    >
                        ↻ Actualiser
                    </button>

                </div>


                {/* =================================
                    STATISTIQUES
                ================================= */}

                <div className="matches-stats">


                    <div className="match-stat-card">

                        <div className="match-stat-icon blue">
                            ⚽
                        </div>

                        <div>

                            <span>
                                Total matchs
                            </span>

                            <strong>
                                {totalMatches}
                            </strong>

                        </div>

                    </div>


                    <div className="match-stat-card">

                        <div className="match-stat-icon green">
                            ✓
                        </div>

                        <div>

                            <span>
                                Matchs terminés
                            </span>

                            <strong>
                                {finishedMatches}
                            </strong>

                        </div>

                    </div>


                    <div className="match-stat-card">

                        <div className="match-stat-icon orange">
                            ◷
                        </div>

                        <div>

                            <span>
                                En attente
                            </span>

                            <strong>
                                {pendingMatches}
                            </strong>

                        </div>

                    </div>

                </div>


                {/* =================================
                    FILTRES
                ================================= */}

                <div className="matches-toolbar">


                    <div className="matches-search">

                        <span>
                            🔎
                        </span>

                        <input
                            type="text"
                            placeholder="Rechercher un joueur ou un tournoi..."
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


                    <div className="matches-filters">

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
                            Tous
                        </button>


                        <button
                            className={
                                filter === "playing"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setFilter("playing")
                            }
                        >
                            🔴 En cours
                        </button>


                        <button
                            className={
                                filter === "finished"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setFilter("finished")
                            }
                        >
                            ✓ Terminés
                        </button>

                    </div>

                </div>


                {/* =================================
                    MATCHS
                ================================= */}

                <section className="matches-panel">


                    <div className="matches-panel-header">

                        <div>

                            <h2>
                                Rencontres
                            </h2>

                            <p>
                                {filteredMatches.length}
                                {" "}
                                match
                                {filteredMatches.length > 1
                                    ? "s"
                                    : ""
                                }
                                affiché
                                {filteredMatches.length > 1
                                    ? "s"
                                    : ""
                                }
                            </p>

                        </div>


                        <div className="matches-live">

                            <i></i>

                            Système actif

                        </div>

                    </div>


                    {loading ? (

                        <div className="matches-loading">

                            <div className="loading-spinner"></div>

                            <p>
                                Chargement des matchs...
                            </p>

                        </div>

                    ) : filteredMatches.length === 0 ? (

                        <div className="matches-empty">

                            <div className="matches-empty-icon">
                                ⚽
                            </div>

                            <h3>
                                Aucun match trouvé
                            </h3>

                            <p>
                                Les matchs apparaîtront ici
                                lorsqu'ils seront disponibles.
                            </p>

                        </div>

                    ) : (

                        <div className="matches-grid">

                            {filteredMatches.map(
                                (match, index) => {

                                    const status =
                                        getStatus(
                                            match.status
                                        );

                                    return (

                                        <article
                                            key={match.id}
                                            className="match-card"
                                            style={{
                                                animationDelay:
                                                    `${index * 50}ms`
                                            }}
                                        >


                                            {/* TOP */}

                                            <div className="match-card-top">

                                                <span className="match-id">
                                                    MATCH #
                                                    {match.id}
                                                </span>


                                                <span
                                                    className={
                                                        `match-status ${status.className}`
                                                    }
                                                >

                                                    <i>
                                                        {status.icon}
                                                    </i>

                                                    {status.label}

                                                </span>

                                            </div>


                                            {/* TOURNOI */}

                                            <div className="match-tournament">

                                                🏆

                                                <span>
                                                    {
                                                        match.tournament_name
                                                        ||
                                                        "Tournoi ArenaFoot"
                                                    }
                                                </span>

                                            </div>


                                            {/* PLAYERS */}

                                            <div className="match-versus">


                                                <div className="match-player">

                                                    <div className="match-avatar">

                                                        {
                                                            match.player_one_name
                                                                ?.charAt(0)
                                                                ?.toUpperCase()
                                                            ||
                                                            "?"
                                                        }

                                                    </div>

                                                    <strong>
                                                        {
                                                            match.player_one_name
                                                            ||
                                                            "Joueur 1"
                                                        }
                                                    </strong>

                                                </div>


                                                <div className="match-score">

                                                    {match.score
                                                        ||
                                                        "VS"
                                                    }

                                                </div>


                                                <div className="match-player">

                                                    <div className="match-avatar second">

                                                        {
                                                            match.player_two_name
                                                                ?.charAt(0)
                                                                ?.toUpperCase()
                                                            ||
                                                            "?"
                                                        }

                                                    </div>

                                                    <strong>
                                                        {
                                                            match.player_two_name
                                                            ||
                                                            "Joueur 2"
                                                        }
                                                    </strong>

                                                </div>


                                            </div>


                                            {/* BOTTOM */}

                                            <div className="match-card-bottom">


                                                <div>

                                                    <span>
                                                        🏆 Gagnant
                                                    </span>

                                                    <strong>

                                                        {
                                                            match.winner_name
                                                                ||
                                                                "En attente"
                                                        }

                                                    </strong>

                                                </div>


                                                <div>

                                                    <span>
                                                        📌 Statut
                                                    </span>

                                                    <strong>
                                                        {status.label}
                                                    </strong>

                                                </div>


                                            </div>


                                        </article>

                                    );

                                }
                            )}

                        </div>

                    )}

                </section>


            </main>

        </div>

    );

}

export default AdminMatches;