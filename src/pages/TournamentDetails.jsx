import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams, useNavigate} from "react-router-dom";
import "../styles/tournamentDetails.css";
const API = import.meta.env.VITE_API_URL;

function TournamentDetails(){
console.log("TournamentDetails chargé");
const {id}=useParams();

const navigate=useNavigate();

const [players, setPlayers] = useState([]);

const [tournament,setTournament]=useState(null);

const [champion,setChampion]=useState(null);



useEffect(()=>{


// Charger le tournoi

axios.get(
`${API}/api/tournaments/${id}`
)

.then(res=>{

console.log("Tournoi :", res.data);

setTournament(res.data);


// Charger le champion

if(res.data.winner_id){

axios.get(
`${API}/api/users/${res.data.winner_id}`
)

.then(response=>{

console.log("Champion :", response.data);

setChampion(response.data);

})

.catch(err=>{

console.log("Erreur champion :", err);

});

}

})

.catch(err=>{

console.log("Erreur tournoi :", err);

});





// Charger les participants

axios.get(`${API}/api/tournaments/${id}/players`)

.then(res=>{

console.log("Participants :", res.data);

setPlayers(res.data);

})

.catch(err=>{

console.log("Erreur participants :", err);

});



},[id]);





if(!tournament){

return <h2>Chargement...</h2>;

}




return (

<div className="details-page">


<h1>
🏆 {tournament.name}
</h1>



<div className="details-card">


<p>
💰 Participation : {tournament.entry_fee} FCFA
</p>


<p>
🎁 Récompense : {tournament.reward} FCFA
</p>


<p>
👥 Joueurs : {tournament.players_count}/{tournament.players_limit}
</p>

<p>
📌 Statut :
{" "}
<strong
style={{
color:
tournament.status === "finished"
? "#16a34a"
: "#f59e0b"
}}
>
{
tournament.status === "finished"
? "🏆 Terminé"
: "🟡 En cours"
}
</strong>
</p>



{
champion && (

<div className="champion-box">

<div className="champion-icon">
🏆
</div>

<h2>
Champion du tournoi
</h2>

<h1>
👑 {champion.pseudo || champion.name}
</h1>

<p>
Félicitations pour cette victoire !
</p>

</div>

)
}




<div className="players-list">

<h2>
👥 Participants ({players.length})
</h2>


{
players.length > 0 ?

players.map(player=>(

<div key={player.id}>

⚽ {player.pseudo}

</div>

))

:

<p>Aucun participant</p>

}


</div>





<button

className="bracket-btn"

onClick={()=>navigate(`/tournaments/${id}/bracket`)}

>

🏆 Voir le bracket

</button>



</div>


</div>

);


}


export default TournamentDetails;