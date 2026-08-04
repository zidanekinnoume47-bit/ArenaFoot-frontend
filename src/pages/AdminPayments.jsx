import React, { useEffect, useState } from "react";
import Sidebar from "../components/admin/Sidebar";
import {
    getPayments,
    validatePayment
} from "../service/adminService";

function AdminPayments() {

    const [payments, setPayments] = useState([]);

    useEffect(() => {
        loadPayments();
    }, []);

    const loadPayments = async () => {

        const data = await getPayments();

        console.log("PAYMENTS :", data);

        setPayments(Array.isArray(data) ? data : []);

    };

    const handleValidate = async (id) => {

        const data = await validatePayment(id);

        alert(data.message);

        loadPayments();

    };

    return (

        <div className="admin-page">

            <Sidebar />

            <div style={{ marginLeft: "280px", padding: "20px" }}>

                <h1>💳 Gestion des paiements</h1>

                {

                    payments.length === 0 ?

                        <p>Aucun paiement disponible.</p>

                        :

                        payments.map(payment => (

                            <div
                                key={payment.id}
                                style={{
                                    border: "1px solid #ddd",
                                    borderRadius: "10px",
                                    padding: "15px",
                                    marginBottom: "15px"
                                }}
                            >

                                <p>👤 {payment.pseudo}</p>

                                <p>🏆 {payment.tournament}</p>

                                <p>💰 {payment.amount} FCFA</p>

                                <p>💳 {payment.method}</p>

                                <p>🆔 {payment.transaction_id}</p>

                                <p>
                                    📌 Statut :
                                    {" "}
                                    <strong
                                        style={{
                                            color:
                                                payment.status === "success"
                                                    ? "green"
                                                    : "orange"
                                        }}
                                    >
                                        {
                                            payment.status === "success"
                                                ? "Validé"
                                                : "En attente"
                                        }
                                    </strong>
                                </p>

                                <p>
                                    📅 {new Date(payment.created_at).toLocaleString()}
                                </p>

                                {
                                    payment.status !== "success" && (

                                        <button
                                            onClick={() => handleValidate(payment.id)}
                                        >
                                            ✅ Valider
                                        </button>

                                    )
                                }

                            </div>

                        ))

                }

            </div>

        </div>

    );

}

export default AdminPayments;