import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/admin.css";

function Sidebar() {

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {

    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");

    setOpen(false);

    navigate("/admin/arenafoot-control", {
      replace: true
    });

  };


  const closeMenu = () => {
    setOpen(false);
  };


  return (

    <>

      {/* =========================
          BARRE MOBILE
      ========================= */}

      <div className="admin-mobile-header">

        <h2>
          👑 ArenaFoot
        </h2>

        <button
          className="admin-burger"
          onClick={() => setOpen(!open)}
          aria-label="Menu administrateur"
        >

          {open ? "✕" : "☰"}

        </button>

      </div>


      {/* =========================
          OVERLAY MOBILE
      ========================= */}

      {open && (
        <div
          className="admin-menu-overlay"
          onClick={closeMenu}
        />
      )}


      {/* =========================
          SIDEBAR
      ========================= */}

      <aside
        className={`admin-sidebar ${
          open ? "admin-sidebar-open" : ""
        }`}
      >

        <div className="admin-sidebar-header">

          <h2>
            👑 ArenaFoot
          </h2>

        </div>


        <nav className="admin-nav">

          <Link
            to="/admin"
            onClick={closeMenu}
          >
            🏠
            <span>Dashboard</span>
          </Link>


          <Link
            to="/admin/players"
            onClick={closeMenu}
          >
            👥
            <span>Joueurs</span>
          </Link>


          <Link
            to="/admin/tournaments"
            onClick={closeMenu}
          >
            🏆
            <span>Tournois</span>
          </Link>


          <Link
            to="/admin/create-tournament"
            onClick={closeMenu}
          >
            ➕
            <span>Créer un tournoi</span>
          </Link>


          <Link
            to="/admin/payments"
            onClick={closeMenu}
          >
            💳
            <span>Paiements</span>
          </Link>


          <Link
            to="/admin/matches"
            onClick={closeMenu}
          >
            ⚽
            <span>Matchs</span>
          </Link>


          <Link
            to="/admin/rooms"
            onClick={closeMenu}
          >
            🎮
            <span>Rooms</span>
          </Link>


          <Link
            to="/admin/rewards"
            onClick={closeMenu}
          >
            🎁
            <span>Récompenses</span>
          </Link>


          <Link
            to="/admin/ranking"
            onClick={closeMenu}
          >
            📊
            <span>Classement</span>
          </Link>


          <Link
            to="/admin/settings"
            onClick={closeMenu}
          >
            ⚙️
            <span>Paramètres</span>
          </Link>

        </nav>


        {/* =========================
            DÉCONNEXION
        ========================= */}

        <button
          type="button"
          onClick={handleLogout}
          className="admin-logout-button"
        >

          🚪
          <span>Déconnexion</span>

        </button>

      </aside>

    </>

  );

}

export default Sidebar;