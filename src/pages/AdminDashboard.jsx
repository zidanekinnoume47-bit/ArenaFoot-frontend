import React from 'react';

import {useEffect,useState} from "react";
import {
getPlayers,
getTournaments
} from "../service/adminService.js";


function AdminDashboard(){


const [players,setPlayers]=useState([]);

const [tournaments,setTournaments]=useState([]);



useEffect(()=>{


getPlayers()
.then(data=>setPlayers(data));


getTournaments()
.then(data=>setTournaments(data));


},[]);



return(

<div>


<h1>
👑 ArenaFoot Admin
</h1>



<h2>
Joueurs
</h2>


<p>
Nombre de joueurs :
{players.length}
</p>



<h2>
Tournois
</h2>


{
tournaments.map(
(t)=>(
<div key={t.id}>

<h3>
{t.name}
</h3>

<p>
Participation :
{t.entry_fee} FCFA
</p>

<p>
Récompense :
{t.reward} FCFA
</p>

</div>
)
)

}


</div>

);


}


export default AdminDashboard;