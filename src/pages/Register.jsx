import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/register.css";

function Register() {

  const [formData, setFormData] = useState({
    name: "",
    pseudo: "",
    email: "",
    phone: "",
    payment_phone: "",
    efootball_id: "",
    password: ""
  });


  const navigate = useNavigate();


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };



  const handleSubmit = async (e) => {

    e.preventDefault();


    try {


      const response = await axios.post(

        "https://arenafoot-backend-production.up.railway.app/api/users/register",
        
        formData

      );


      console.log(
        "Inscription réussie :",
        response.data
      );



      if(response.data.user){

        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );

      }



      if(response.data.token){

        localStorage.setItem(
          "token",
          response.data.token
        );

      }



      alert(
        "Compte créé avec succès !"
      );



      navigate("/login");



    } catch(error){


      console.error(
        "Erreur inscription :",
        error
      );


      alert(

        error.response?.data?.message ||

        "Erreur lors de la création du compte"

      );


    }


  };




  return (

    <div className="register-page">


      <div className="register-box">


        <h1>
          🏆 Créer un compte ArenaFoot
        </h1>




        <input

          type="text"

          name="name"

          placeholder="Nom complet"

          value={formData.name}

          onChange={handleChange}

        />




        <input

          type="text"

          name="pseudo"

          placeholder="Pseudo"

          value={formData.pseudo}

          onChange={handleChange}

        />




        <input

          type="email"

          name="email"

          placeholder="Email"

          value={formData.email}

          onChange={handleChange}

        />




        <input

          type="text"

          name="phone"

          placeholder="Numéro de téléphone"

          value={formData.phone}

          onChange={handleChange}

        />




        <input

          type="text"

          name="payment_phone"

          placeholder="Numéro de dépôt MyFeda"

          value={formData.payment_phone}

          onChange={handleChange}

        />




        <input

          type="text"

          name="efootball_id"

          placeholder="ID eFootball"

          value={formData.efootball_id}

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

          Créer mon compte

        </button>



      </div>


    </div>

  );

}


export default Register;