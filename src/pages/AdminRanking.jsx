import React from "react";
import RankingCard from "../components/RankingCard";
import Sidebar from "../components/admin/Sidebar";
import "../../src/styles/admin.css";

function AdminRanking() {

    return (

        <div className="admin-page">

            <Sidebar />

            <main className="admin-content ranking-page">

                {/* HEADER */}

                <div className="ranking-header">

                    <div>

                        <div className="admin-eyebrow">
                            ARENAFOOT COMPETITION
                        </div>

                        <h1>
                            🏅 Classement ArenaFoot
                        </h1>

                        <p>
                            Consultez les performances et
                            le classement des joueurs.
                        </p>

                    </div>

                </div>


                {/* PODIUM VISUEL */}

                <div className="ranking-hero">

                    <div className="ranking-hero-icon">
                        🏆
                    </div>

                    <div>

                        <span>
                            CLASSEMENT GÉNÉRAL
                        </span>

                        <h2>
                            Les meilleurs joueurs
                        </h2>

                        <p>
                            Les performances des joueurs
                            sont regroupées dans ce classement.
                        </p>

                    </div>

                </div>


                {/* CLASSEMENT */}

                <section className="ranking-panel">

                    <div className="ranking-panel-header">

                        <div>

                            <h2>
                                📊 Classement des joueurs
                            </h2>

                            <p>
                                Performances ArenaFoot
                            </p>

                        </div>

                        <div className="ranking-live">
                            ● Données en direct
                        </div>

                    </div>


                    <div className="ranking-content">

                        <RankingCard />

                    </div>

                </section>

            </main>

        </div>

    );

}

export default AdminRanking;