import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./../styles/navbar.css";


function Navbar() {

  const [open, setOpen] = useState(false);


  return (

    <nav className="navbar">


      <div className="logo">
        🏆 <span>ArenaFoot</span>
      </div>



      <button 
        className="burger"
        onClick={()=>setOpen(!open)}
      >
        ☰
      </button>



      <ul className={`nav-links ${open ? "active" : ""}`}>

        <li>
          <Link to="/" onClick={()=>setOpen(false)}>
            Accueil
          </Link>
        </li>


        <li>
          <Link to="/tournaments" onClick={()=>setOpen(false)}>
            Tournois
          </Link>
        </li>


        <li>
          <Link to="/ranking" onClick={()=>setOpen(false)}>
            Classement
          </Link>
        </li>


        <li>
          <Link to="/login" onClick={()=>setOpen(false)}>
            Connexion
          </Link>
        </li>


        <li>
          <Link 
            to="/register"
            className="register-btn"
            onClick={()=>setOpen(false)}
          >
            Créer un compte
          </Link>
        </li>


      </ul>


    </nav>

  );

}


export default Navbar;