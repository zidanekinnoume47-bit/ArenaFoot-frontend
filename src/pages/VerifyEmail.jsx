import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API =
  import.meta.env.VITE_API_URL ||
  "https://arenafoot-backend-production.up.railway.app";

function VerifyEmail() {

    const navigate = useNavigate();

    const [email, setEmail] = useState(
        localStorage.getItem("verifyEmail") || ""
    );

    const [code, setCode] = useState("");

    const verify = async () => {

        try {

            const res = await axios.post(
                `${API}/api/users/verify-email`,
                {
                    email,
                    code
                }
            );

            alert(res.data.message);

            navigate("/login");

        } catch (err) {

            alert(
                err.response?.data?.message ||
                "Code invalide"
            );

        }

    };

    return (

        <div className="container">

            <h2>📧 Vérification du compte</h2>

            <p>
                Entrez le code reçu par email.
            </p>

            <input
                type="email"
                placeholder="Votre email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
            />

            <input
                type="text"
                placeholder="Code à 6 chiffres"
                value={code}
                onChange={(e)=>setCode(e.target.value)}
            />

            <button onClick={verify}>
                Vérifier
            </button>

        </div>

    );

}

export default VerifyEmail;