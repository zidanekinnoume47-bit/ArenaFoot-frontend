import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import "../styles/verifyLogin.css";

const API = import.meta.env.VITE_API_URL;

function VerifyLogin() {

    const navigate = useNavigate();
    const location = useLocation();

    const email =
        location.state?.email ||
        localStorage.getItem("loginVerifyEmail");


    const [code, setCode] = useState("");

    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {

        e.preventDefault();


        if (loading) {
            return;
        }


        if (!email) {

            alert(
                "Adresse email introuvable. Recommencez la connexion."
            );

            navigate("/login");

            return;

        }


        if (code.length !== 6) {

            alert(
                "Veuillez entrer le code à 6 chiffres."
            );

            return;

        }


        try {

            setLoading(true);


            const response = await axios.post(

                `${API}/api/users/verify-login`,

                {
                    email,
                    code
                }

            );


            console.log(
                "Connexion vérifiée :",
                response.data
            );


            /*
             * IMPORTANT
             *
             * Le token n'est enregistré
             * qu'après validation du code.
             */

            localStorage.setItem(
                "token",
                response.data.token
            );


            localStorage.setItem(
                "user",
                JSON.stringify(
                    response.data.user
                )
            );


            localStorage.removeItem(
                "loginVerifyEmail"
            );


            alert(
                "Connexion réussie 🎉"
            );


            /*
             * Redirection selon le rôle
             */

            if (
                response.data.user.role ===
                "admin"
            ) {

                navigate("/admin");

            } else {

                navigate("/dashboard");

            }


        } catch (error) {

            console.log(
                "Erreur vérification login :",
                error
            );


            alert(

                error.response?.data?.message ||

                "Code incorrect"

            );


        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="verify-login-page">

            <div className="verify-login-box">


                <div className="verify-icon">
                    🔐
                </div>


                <h1>
                    Vérification de connexion
                </h1>


                <p className="verify-text">

                    Un code de vérification a été
                    envoyé à :

                </p>


                <strong className="verify-email">

                    {email}

                </strong>


                <form
                    onSubmit={handleSubmit}
                >

                    <input

                        type="text"

                        inputMode="numeric"

                        maxLength="6"

                        placeholder="••••••"

                        value={code}

                        onChange={(e) => {

                            const value =
                                e.target.value
                                .replace(/\D/g, "");

                            setCode(value);

                        }}

                        disabled={loading}

                        autoFocus

                    />


                    <button
                        type="submit"
                        disabled={
                            loading ||
                            code.length !== 6
                        }
                    >

                        {loading
                            ? "Vérification..."
                            : "Vérifier le code"
                        }

                    </button>

                </form>


                <p className="verify-expire">

                    ⏱️ Le code est valable
                    pendant 5 minutes.

                </p>


                <button
                    className="back-login"
                    onClick={() =>
                        navigate("/login")
                    }
                >

                    ← Retour à la connexion

                </button>


            </div>

        </div>

    );

}


export default VerifyLogin;