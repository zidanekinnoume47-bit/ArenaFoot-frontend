import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../styles/login.css";

const API = import.meta.env.VITE_API_URL;

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        if (loading) {
            return;
        }


        if (!formData.email || !formData.password) {

            alert("Veuillez remplir tous les champs.");

            return;

        }


        try {

            setLoading(true);


            const response = await axios.post(
                `${API}/api/users/login`,
                formData
            );


            console.log(
                "Réponse connexion :",
                response.data
            );


            /*
             * IMPORTANT
             *
             * On NE sauvegarde PAS encore
             * le token.
             *
             * Le backend doit d'abord
             * envoyer un code par email.
             */


            localStorage.setItem(
                "loginVerifyEmail",
                formData.email
            );


            navigate("/verify-login", {

                state: {
                    email: formData.email
                }

            });


        } catch (error) {

            console.log(
                "Erreur connexion :",
                error
            );


            alert(
                error.response?.data?.message ||
                "Erreur de connexion"
            );


        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="login-page">

            <div className="login-box">

                <div className="login-icon">
                    🔐
                </div>


                <h1>
                    Connexion ArenaFoot
                </h1>


                <p className="login-description">
                    Connecte-toi pour accéder
                    à ton espace joueur.
                </p>


                <input
                    type="email"
                    name="email"
                    placeholder="Adresse email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                />


                <input
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                />


                <button
                    onClick={handleSubmit}
                    disabled={loading}
                >

                    {loading
                        ? "Vérification..."
                        : "Se connecter"
                    }

                </button>


                <button
                    type="button"
                    className="forgot-password"
                    onClick={() =>
                        navigate("/forgot-password")
                    }
                >

                    Mot de passe oublié ?

                </button>


            </div>

        </div>

    );

}


export default Login;