import React from "react";
import RankingCard from "../components/RankingCard";
import Sidebar from "../components/admin/Sidebar";

function AdminRanking() {

    return (

        <div className="admin-page">

            <Sidebar />

            <div
                style={{
                    marginLeft: "280px",
                    padding: "20px"
                }}
            >

                <h1>🏅 Classement ArenaFoot</h1>

                <RankingCard />

            </div>

        </div>

    );

}

export default AdminRanking;