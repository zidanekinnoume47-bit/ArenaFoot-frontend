import React,{useEffect,useState} from "react";
import axios from "axios";

import "../styles/ranking.css";
const API = import.meta.env.VITE_API_URL;


function RankingCard(){

const [players,setPlayers] = useState([]);


useEffect(()=>{

axios.get(
`${API}/api/users/ranking`
)

.then(res=>{

setPlayers(res.data.slice(0,3));

})

.catch(err=>{

console.log(err);

});

},[]);



return(

<div className="ranking-card">

<h2>
🥇 Classement ArenaFoot
</h2>


{
players.map((player,index)=>(

<div 
className="player"
key={player.id}
>

<span>
#{index+1}
</span>


<strong>
{player.pseudo}
</strong>


<p>
{player.wins || 0} victoires
</p>


</div>

))

}


</div>

);

}


export default RankingCard;