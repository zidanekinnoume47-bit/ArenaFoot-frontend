import React, {useEffect, useState} from "react";
import axios from "axios";
import "../styles/profile.css";
const API = import.meta.env.VITE_API_URL;


function Profile(){

const [profile,setProfile] = useState(null);


const user = JSON.parse(localStorage.getItem("user"));

const userId = user?.id;



useEffect(()=>{

if(!userId){

console.log("Aucun utilisateur connecté");

return;

}


axios.get(
`${API}/api/users/profile/${userId}`
)

.then(res=>{

console.log("Profil :", res.data);

setProfile(res.data);

})

.catch(err=>{

console.log("Erreur profil :", err);

});


},[userId]);




// Protection avant affichage

if(!profile){

return (

<div className="profile-page">

<h2>
Chargement du profil...
</h2>

</div>

);

}



return(

<div className="profile-page">


<div className="profile-card">

<h1>
👤 {profile.pseudo}

{profile.tournaments_won > 0 && (
<span className="champion-badge">
🏆 Champion
</span>
)}

</h1>


<p>
📧 {profile.email}
</p>


<p>
🆔 eFootball ID : {profile.efootball_id}
</p>



<div className="stats">


<div>

🏆

<h3>
{profile.tournaments_won}
</h3>

<p>
Tournois gagnés
</p>

</div>



<div>

⚽

<h3>
{profile.matches_played}
</h3>

<p>
Matchs joués
</p>

</div>



<div>

✅

<h3>
{profile.wins}
</h3>

<p>
Victoires
</p>

</div>



<div>

❌

<h3>
{profile.losses}
</h3>

<p>
Défaites
</p>

</div>


</div>



<h2>

📊 Taux de victoire : {profile.win_rate}%

</h2>



</div>


</div>

);


}


export default Profile;