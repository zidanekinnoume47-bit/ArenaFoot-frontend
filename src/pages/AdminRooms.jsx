import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/admin/Sidebar";

const API = import.meta.env.VITE_API_URL;

function AdminRooms() {

    const [rooms, setRooms] = useState([]);

    useEffect(() => {

        loadRooms();

    }, []);

    const loadRooms = async () => {

        const token = localStorage.getItem("token");

        const res = await axios.get(
            `${API}/api/rooms`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        setRooms(res.data);

    };

    const editCode = async (room) => {

        const code = prompt("Entrer le code eFootball", room.room_code || "");

        if (!code) return;

        const token = localStorage.getItem("token");

        await axios.put(
            `${API}/api/rooms/code`,
            {
                room_id: room.id,
                room_code: code
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        loadRooms();

    };

    return (

        <div className="admin-page">

            <Sidebar />

            <div style={{ marginLeft: "280px", padding: "20px" }}>

                <h1>🎮 Gestion des Rooms</h1>

                {

                    rooms.map(room => (

                        <div
                            key={room.id}
                            style={{
                                border: "1px solid #ddd",
                                padding: "15px",
                                marginBottom: "15px",
                                borderRadius: "8px"
                            }}
                        >

                            <p>⚔ Match #{room.match_id}</p>

                            <p>👤 {room.host_name}</p>

                            <p>🆚</p>

                            <p>👤 {room.guest_name}</p>

                            <p>🎮 Code : {room.room_code || "Aucun"}</p>

                            <p>📌 {room.status}</p>

                            <button onClick={() => editCode(room)}>
                                Modifier le code
                            </button>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default AdminRooms;