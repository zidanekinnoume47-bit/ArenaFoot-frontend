import React, { useEffect, useState } from "react";
import axios from "axios";

import "../styles/home.css";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TournamentCard from "../components/TournamentCard";
import RankingCard from "../components/RankingCard";
import HowItWorks from "../components/Howitworks";
import Footer from "../components/Footer";


function Home(){

  const [tournament, setTournament] = useState(null);


  useEffect(()=>{

    axios.get(
      "https://arenafoot-backend-production.up.railway.app/api/tournaments"
    )

    .then(response=>{

      console.log("TOURNOIS :", response.data);

      setTournament(response.data[0]);

    })

    .catch(error=>{

      console.log("ERREUR API :", error);

    });


  },[]);



  return(
    <>

      <Navbar />

      <Hero />

      <section className="home-section">

        <div className="cards-container">

          {
            tournament && (
              <TournamentCard tournament={tournament}/>
            )
          }

          <RankingCard />

        </div>

      </section>


      <HowItWorks />

      <Footer />

    </>
  );

}


export default Home;