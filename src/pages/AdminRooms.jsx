import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Sidebar from "../components/admin/Sidebar";

const API = import.meta.env.VITE_API_URL;

function AdminRooms() {

    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    const [selectedRoom, setSelectedRoom] = useState(null);
    const [newCode, setNewCode] = useState("");

    const [saving, setSaving] = useState(false);


    useEffect(() => {
        loadRooms();
    }, []);


    const getToken = () => {
        return (
            localStorage.getItem("adminToken") ||
            localStorage.getItem("token")
        );
    };


    const loadRooms = async () => {

        try {

            setLoading(true);

            const token = getToken();

            const res = await axios.get(
                `${API}/api/rooms`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setRooms(
                Array.isArray(res.data)
                    ? res.data
                    : []
            );

        } catch (error) {

            console.error(
                "Erreur chargement rooms :",
                error
            );

        } finally {

            setLoading(false);
        }

    };


    const openEditModal = (room) => {

        setSelectedRoom(room);

        setNewCode(
            room.room_code || ""
        );

    };


    const closeEditModal = () => {

        if (saving) return;

        setSelectedRoom(null);

        setNewCode("");

    };


    const saveCode = async () => {

        if (!selectedRoom) return;

        if (!newCode.trim()) {

            alert(
                "Veuillez entrer un code eFootball."
            );

            return;
        }


        try {

            setSaving(true);

            const token = getToken();

            await axios.put(
                `${API}/api/rooms/code`,
                {
                    room_id: selectedRoom.id,
                    room_code: newCode.trim()
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            alert(
                "Code de la room modifié avec succès."
            );

            closeEditModal();

            await loadRooms();

        } catch (error) {

            console.error(
                "Erreur modification code :",
                error
            );

            alert(
                error.response?.data?.message ||
                "Impossible de modifier le code."
            );

        } finally {

            setSaving(false);
        }

    };


    const getRoomStatus = (status) => {

        if (
            status === "active" ||
            status === "playing"
        ) {

            return {
                label: "En cours",
                className: "room-active"
            };

        }

        if (
            status === "finished" ||
            status === "closed"
        ) {

            return {
                label: "Terminée",
                className: "room-finished"
            };

        }

        return {
            label: status || "En attente",
            className: "room-pending"
        };

    };


    const filteredRooms = useMemo(() => {

        const value =
            search
                .toLowerCase()
                .trim();

        return rooms.filter((room) => {

            const matchesSearch =
                !value ||

                String(room.match_id || "")
                    .includes(value) ||

                room.host_name
                    ?.toLowerCase()
                    .includes(value) ||

                room.guest_name
                    ?.toLowerCase()
                    .includes(value) ||

                room.room_code
                    ?.toLowerCase()
                    .includes(value);


            const status =
                getRoomStatus(room.status);


            const matchesFilter =
                filter === "all" ||
                (
                    filter === "active" &&
                    status.className ===
                        "room-active"
                ) ||
                (
                    filter === "pending" &&
                    status.className ===
                        "room-pending"
                ) ||
                (
                    filter === "finished" &&
                    status.className ===
                        "room-finished"
                );


            return (
                matchesSearch &&
                matchesFilter
            );

        });

    }, [rooms, search, filter]);


    const activeRooms =
        rooms.filter(room => {

            const status =
                getRoomStatus(room.status);

            return (
                status.className ===
                "room-active"
            );

        });


    const pendingRooms =
        rooms.filter(room => {

            const status =
                getRoomStatus(room.status);

            return (
                status.className ===
                "room-pending"
            );

        });


    const roomsWithCode =
        rooms.filter(
            room =>
                room.room_code
        );


    return (

        <div className="admin-page">

            <Sidebar />


            <main className="admin-content rooms-page">


                {/* HEADER */}

                <div className="rooms-header">

                    <div>

                        <div className="admin-eyebrow">
                            ARENAFOOT GAME CONTROL
                        </div>

                        <h1>
                            🎮 Gestion des Rooms
                        </h1>

                        <p>
                            Gérez les salons eFootball
                            associés aux matchs.
                        </p>

                    </div>


                    <button
                        className="rooms-refresh"
                        onClick={loadRooms}
                    >
                        ↻ Actualiser
                    </button>

                </div>


                {/* STATS */}

                <div className="rooms-stats">


                    <div className="room-stat-card">

                        <div className="room-stat-icon blue">
                            🎮
                        </div>

                        <div>

                            <span>
                                Total Rooms
                            </span>

                            <strong>
                                {rooms.length}
                            </strong>

                        </div>

                    </div>


                    <div className="room-stat-card">

                        <div className="room-stat-icon green">
                            🔴
                        </div>

                        <div>

                            <span>
                                En cours
                            </span>

                            <strong>
                                {activeRooms.length}
                            </strong>

                        </div>

                    </div>


                    <div className="room-stat-card">

                        <div className="room-stat-icon orange">
                            ◷
                        </div>

                        <div>

                            <span>
                                En attente
                            </span>

                            <strong>
                                {pendingRooms.length}
                            </strong>

                        </div>

                    </div>


                    <div className="room-stat-card">

                        <div className="room-stat-icon purple">
                            🔑
                        </div>

                        <div>

                            <span>
                                Codes disponibles
                            </span>

                            <strong>
                                {roomsWithCode.length}
                            </strong>

                        </div>

                    </div>

                </div>


                {/* TOOLBAR */}

                <div className="rooms-toolbar">


                    <div className="rooms-search">

                        <span>
                            🔎
                        </span>

                        <input
                            type="text"
                            placeholder="Rechercher un joueur, match ou code..."
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


                    <div className="rooms-filters">

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
                                filter === "active"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setFilter("active")
                            }
                        >
                            🔴 En cours
                        </button>


                        <button
                            className={
                                filter === "pending"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setFilter("pending")
                            }
                        >
                            ◷ Attente
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
                            ✓ Terminées
                        </button>

                    </div>

                </div>


                {/* PANEL */}

                <section className="rooms-panel">


                    <div className="rooms-panel-header">

                        <div>

                            <h2>
                                🎮 Salons de jeu
                            </h2>

                            <p>
                                {filteredRooms.length}
                                {" "}
                                room
                                {filteredRooms.length > 1
                                    ? "s"
                                    : ""
                                }
                            </p>

                        </div>


                        <div className="rooms-live">

                            <i></i>

                            Serveur actif

                        </div>

                    </div>


                    {loading ? (

                        <div className="rooms-loading">

                            <div className="loading-spinner"></div>

                            <p>
                                Chargement des rooms...
                            </p>

                        </div>

                    ) : filteredRooms.length === 0 ? (

                        <div className="rooms-empty">

                            <div>
                                🎮
                            </div>

                            <h3>
                                Aucune room trouvée
                            </h3>

                            <p>
                                Les salons de jeu
                                apparaîtront ici.
                            </p>

                        </div>

                    ) : (

                        <div className="rooms-grid">

                            {filteredRooms.map(
                                (room, index) => {

                                    const status =
                                        getRoomStatus(
                                            room.status
                                        );

                                    return (

                                        <article
                                            key={room.id}
                                            className="room-card"
                                            style={{
                                                animationDelay:
                                                    `${index * 50}ms`
                                            }}
                                        >


                                            {/* TOP */}

                                            <div className="room-card-top">

                                                <span className="room-match-id">
                                                    MATCH #
                                                    {room.match_id}
                                                </span>


                                                <span
                                                    className={
                                                        `room-status ${status.className}`
                                                    }
                                                >
                                                    {status.label}
                                                </span>

                                            </div>


                                            {/* PLAYERS */}

                                            <div className="room-players">


                                                <div className="room-player">

                                                    <div className="room-avatar">

                                                        {
                                                            room.host_name
                                                                ?.charAt(0)
                                                                ?.toUpperCase()
                                                            ||
                                                            "?"
                                                        }

                                                    </div>

                                                    <strong>
                                                        {
                                                            room.host_name
                                                            ||
                                                            "Joueur"
                                                        }
                                                    </strong>

                                                    <span>
                                                        HOST
                                                    </span>

                                                </div>


                                                <div className="room-vs">

                                                    VS

                                                </div>


                                                <div className="room-player">

                                                    <div className="room-avatar guest">

                                                        {
                                                            room.guest_name
                                                                ?.charAt(0)
                                                                ?.toUpperCase()
                                                            ||
                                                            "?"
                                                        }

                                                    </div>

                                                    <strong>
                                                        {
                                                            room.guest_name
                                                            ||
                                                            "Joueur"
                                                        }
                                                    </strong>

                                                    <span>
                                                        GUEST
                                                    </span>

                                                </div>

                                            </div>


                                            {/* CODE */}

                                            <div className="room-code-box">

                                                <div>

                                                    <span>
                                                        🔑 CODE EFOOTBALL
                                                    </span>

                                                    <strong>
                                                        {
                                                            room.room_code
                                                            ||
                                                            "AUCUN CODE"
                                                        }
                                                    </strong>

                                                </div>


                                                <button
                                                    onClick={() =>
                                                        openEditModal(
                                                            room
                                                        )
                                                    }
                                                >
                                                    ✏️
                                                </button>

                                            </div>


                                            {/* FOOTER */}

                                            <div className="room-card-footer">

                                                <span>
                                                    🎮 Room #{room.id}
                                                </span>


                                                <button
                                                    onClick={() =>
                                                        openEditModal(
                                                            room
                                                        )
                                                    }
                                                >
                                                    Modifier le code
                                                </button>

                                            </div>


                                        </article>

                                    );

                                }
                            )}

                        </div>

                    )}

                </section>

            </main>


            {/* MODAL */}

            {selectedRoom && (

                <div
                    className="room-modal-overlay"
                    onClick={closeEditModal}
                >

                    <div
                        className="room-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <button
                            className="room-modal-close"
                            onClick={closeEditModal}
                        >
                            ✕
                        </button>


                        <div className="room-modal-icon">
                            🎮
                        </div>


                        <h2>
                            Modifier la Room
                        </h2>


                        <p>
                            Match #
                            {selectedRoom.match_id}
                        </p>


                        <div className="room-modal-players">

                            <span>
                                {selectedRoom.host_name}
                            </span>

                            <strong>
                                VS
                            </strong>

                            <span>
                                {selectedRoom.guest_name}
                            </span>

                        </div>


                        <label>
                            Code de la room eFootball
                        </label>


                        <input
                            type="text"
                            value={newCode}
                            onChange={(e) =>
                                setNewCode(
                                    e.target.value
                                )
                            }
                            placeholder="Entrer le code..."
                            autoFocus
                        />


                        <div className="room-modal-actions">

                            <button
                                className="room-cancel"
                                onClick={closeEditModal}
                                disabled={saving}
                            >
                                Annuler
                            </button>


                            <button
                                className="room-save"
                                onClick={saveCode}
                                disabled={saving}
                            >

                                {saving
                                    ? "⏳ Enregistrement..."
                                    : "💾 Enregistrer"
                                }

                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

}

export default AdminRooms;