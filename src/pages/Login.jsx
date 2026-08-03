import React from 'react';

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/login.css";
const API = import.meta.env.VITE_API_URL;


function Login(){

    const [formData, setFormData] = useState({
    email:"",
    password:""
});

const navigate = useNavigate();
const handleChange = (e)=>{

setFormData({

...formData,

[e.target.name]: e.target.value

});

};

const handleSubmit = async(e)=>{

e.preventDefault();


try{


const response = await 
axios.post(

`${API}/api/users/login`,

formData

);


console.log(response.data);


localStorage.setItem(
    "token",
    response.data.token
);


localStorage.setItem(
    "user",
    JSON.stringify(response.data.user)
);


alert("Connexion réussie");


navigate("/dashboard");


}catch(error){


console.log(error);


alert(
error.response?.data?.message ||
"Erreur de connexion"
);


}

};
return(

<div className="login-page">


<div className="login-box">


<h1>
🏆 Connexion ArenaFoot
</h1>


<input
type="email"
name="email"
placeholder="Adresse email"
value={formData.email}
onChange={handleChange}
/>


<input
type="password"
name="password"
placeholder="Mot de passe"
value={formData.password}
onChange={handleChange}
/>


<button onClick={handleSubmit}>
Se connecter
</button>


<p>
Mot de passe oublié ?
</p>


</div>


</div>

);

}


export default Login;