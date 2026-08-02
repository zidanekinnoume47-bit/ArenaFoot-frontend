import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/tournament.css";


function TournamentCard({ tournament }) {


  const navigate = useNavigate();


  const [playerCount, setPlayerCount] = useState(
    tournament.players_count || 0
  );



  console.log("ID DU TOURNOI CARD :", tournament.id);




  const handleJoin = async () => {


    try {


      const storedUser = localStorage.getItem("user");



      if (!storedUser) {


        alert("Veuillez vous connecter");


        return;


      }




      const user = JSON.parse(storedUser);




      if (!user.id) {


        alert("Utilisateur introuvable");


        return;


      }










      // Création du paiement FedaPay

      const paymentResponse = await axios.post(

        "https://arenafoot-backend-production.up.railway.app/api/payments/create",

        {
            player_id: user.id,
            user_id: user.id,
            tournament_id: tournament.id,
            amount: tournament.entry_fee,
            method: "mobile_money",
            firstname: user.pseudo || "Joueur",
            lastname: "ArenaFoot",
            email: user.email || "client@arenafoot.com"
        }

      );





      console.log(

        "Paiement créé :",

        paymentResponse.data

      );






      localStorage.setItem(

        "payment_id",

        paymentResponse.data.payment_id

      );






      // Redirection vers FedaPay

      if(paymentResponse.data.payment_url){



        window.location.href = paymentResponse.data.payment_url;



      }else{


        alert(

          "Lien de paiement introuvable"

        );


      }







    } catch(error) {



      console.error(

        "Erreur création paiement :",

        error

      );



      alert(

        error.response?.data?.message ||

        "Erreur création paiement"

      );



    }



  };








  return (


    <div className="tournament-card">





      <h2

        className="tournament-title"

        onClick={() => navigate(`/tournaments/${tournament.id}`)}

      >


        🏆 {tournament.name}


      </h2>






      <p>


        💰 Participation :


        <strong>


          {tournament.entry_fee} FCFA


        </strong>


      </p>







      <p>


        🎁 Récompense :


        <strong>


          {tournament.reward} FCFA


        </strong>


      </p>







      <p>


        👥 Places :


        {playerCount} / {tournament.players_limit || 16}



      </p>







      <button


        className="details-btn"


        onClick={() => navigate(`/tournaments/${tournament.id}`)}


      >


        📋 Voir le tournoi


      </button>









      {


        tournament.status !== "finished" && (


          <button


            className="participate-btn"


            onClick={handleJoin}


          >


            Participer


          </button>


        )


      }









      <button


        className="bracket-btn"


        onClick={() => navigate(`/tournaments/${tournament.id}/bracket`)}


      >


        Voir le bracket


      </button>







    </div>


  );


}




export default TournamentCard;