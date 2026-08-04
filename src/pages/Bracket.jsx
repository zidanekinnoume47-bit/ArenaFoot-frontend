import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/bracket.css";
const API = import.meta.env.VITE_API_URL;


function Bracket(){

const { id } = useParams();

console.log("ID DU TOURNOI :", id);


const [matches,setMatches] = useState([]);



const finishMatch = async(matchId, winnerId)=>{

try{

await axios.post(
`${API}/api/matches/finish`,
{
match_id: matchId,
winner: winnerId,
score:"1-0"
}
);


alert("Match terminé");

window.location.reload();


}catch(error){

console.log(error);

alert("Erreur validation match");

}

};



useEffect(() => {
    
axios.get(
`${API}/api/matches/bracket/${id}`
)

.then(res => {

console.log("BRACKET API :", res.data);

setMatches(res.data);

})

.catch(err => {

console.log(err);

});

}, [id]);




const rounds = {

"Huitième de finale": [],
"Quart de finale": [],
"Demi-finale": [],
"Finale": []

};



matches.forEach(match=>{

if(rounds[match.round]){

rounds[match.round].push(match);

}

});


console.log("ROUNDS :",rounds);

const MatchCard = ({match}) => (

<div className="match" key={match.id}>


<p>
{match.player_one_name || "À déterminer"}
</p>


<span>

{match.score || "VS"}

</span>


<p>
{match.player_two_name || "À déterminer"}
</p>



{
match.status !== "finished" &&
match.player_one &&
(

<button
onClick={()=>finishMatch(match.id,match.player_one)}
>

Gagnant : {match.player_one_name}

</button>

)

}



{
match.status !== "finished" &&
match.player_two &&
(

<button
onClick={()=>finishMatch(match.id,match.player_two)}
>

Gagnant : {match.player_two_name}

</button>

)

}



</div>

);




return(

<div className="bracket-page">


<h1>
🏆 ArenaFoot Tournament
</h1>



<div className="bracket">


<div className="round">

<h2>8e Finale</h2>

{

rounds["Huitième de finale"].map(match=>(

<MatchCard 
key={match.id}
match={match}
/>

))

}

</div>




<div className="round">

<h2>Quart</h2>

{

rounds["Quart de finale"].map(match=>(

<MatchCard
key={match.id}
match={match}
/>

))

}

</div>





<div className="round">

<h2>Demi</h2>

{

rounds["Demi-finale"].map(match=>(

<MatchCard
key={match.id}
match={match}
/>

))



}

{

<div className="round finale">

<h2>Finale 🏆</h2>

{
rounds["Finale"].map(match => (

<MatchCard
key={match.id}
match={match}
/>

))
}

</div>

}



</div>


</div>


</div>

);


}


export default Bracket;