import React from 'react';

import "../styles/howItWorks.css";


function HowItWorks(){

const steps = [

{
number:"1️⃣",
title:"Créer un compte",
text:"Inscris-toi gratuitement et crée ton profil joueur eFootball."
},

{
number:"2️⃣",
title:"Payer la participation",
text:"Choisis ton tournoi et règle les frais d'inscription en ligne."
},

{
number:"3️⃣",
title:"Jouer ton match",
text:"Rejoins ton adversaire grâce au code de salle eFootball."
},

{
number:"4️⃣",
title:"Se qualifier",
text:"Gagne tes matchs et avance jusqu'à la finale."
},

{
number:"5️⃣",
title:"Recevoir ta récompense",
text:"Le gagnant reçoit directement son gain sur son numéro de dépôt."
}

];


return(

<section className="how-section">


<h1>
⚽ Comment ça marche ?
</h1>


<div className="steps-container">


{
steps.map((step,index)=>(

<div 
className="step-card"
key={index}
>

<div className="step-number">
{step.number}
</div>


<h3>
{step.title}
</h3>


<p>
{step.text}
</p>


</div>

))

}


</div>


</section>

);

}


export default HowItWorks;