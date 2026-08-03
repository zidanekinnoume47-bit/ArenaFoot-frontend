import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/room.css";
const API = import.meta.env.VITE_API_URL;


function Room(){

const { id } = useParams();


const [room,setRoom] = useState(null);

const [scoreHome,setScoreHome] = useState("");

const [scoreGuest,setScoreGuest] = useState("");



useEffect(()=>{


axios.get(
`${API}/api/rooms/${id}`
)

.then(response=>{

console.log("Salle :",response.data);

setRoom(response.data);

})

.catch(error=>{

console.log(error);

});


},[id]);





const submitResult = async()=>{


if(scoreHome === "" || scoreGuest === ""){

alert("Veuillez entrer le score");

return;

}



if(!room){

return;

}



let winner;



if(Number(scoreHome) > Number(scoreGuest)){

winner = room.host_player;

}

else if(Number(scoreGuest) > Number(scoreHome)){

winner = room.guest_player;

}

else{

alert("Match nul impossible");

return;

}





try{


await axios.put(

`${API}/api/matches/finish`,

{

match_id: room.match_id,

winner:winner,

score:`${scoreHome}-${scoreGuest}`

}

);



alert("Résultat enregistré 🏆");


window.location.reload();



}catch(error){


console.log(
"Erreur résultat :",
error
);


alert("Erreur lors de l'enregistrement");


}



};






return(


<div className="room-page">


<h1>
🎮 Salle eFootball
</h1>




{

room ?

<>


<div className="room-card">


<h2>
⚔️ Match
</h2>



<p>
Joueur domicile :
<br/>

{room.host_name || room.host_player}

</p>



<h3>
VS
</h3>



<p>
Joueur extérieur :
<br/>

{room.guest_name || room.guest_player}

</p>





<h2>
🎮 Code salle
</h2>


<div className="code">

{room.room_code || "En attente"}

</div>



<p>
Statut : {room.status}
</p>





<hr />



<h2>
🏆 Résultat du match
</h2>



<input

type="number"

placeholder="Score domicile"

value={scoreHome}

onChange={(e)=>setScoreHome(e.target.value)}

/>



<input

type="number"

placeholder="Score extérieur"

value={scoreGuest}

onChange={(e)=>setScoreGuest(e.target.value)}

/>




<button onClick={submitResult}>

Valider le résultat

</button>




</div>


</>


:


<p>
Chargement de la salle...
</p>


}



</div>


);


}


export default Room;