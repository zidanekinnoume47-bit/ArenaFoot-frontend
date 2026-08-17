import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/admin/Sidebar";

import {
    getPayments,
    validatePayment
} from "../service/adminService";

import "../styles/admin.css";

function AdminPayments() {

    const [payments, setPayments] = useState([]);

    const [loading, setLoading] = useState(true);

    const [validating, setValidating] = useState(null);

    const [search, setSearch] = useState("");

    const [filter, setFilter] = useState("all");

    const [selectedPayment, setSelectedPayment] = useState(null);


    useEffect(() => {

        loadPayments();

    }, []);


    const loadPayments = async () => {

        try {

            setLoading(true);

            const data = await getPayments();

            console.log("PAYMENTS :", data);

            setPayments(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (error) {

            console.error(
                "Erreur chargement paiements :",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    const handleValidate = async (id) => {

        try {

            setValidating(id);

            const data = await validatePayment(id);

            alert(data.message);

            setSelectedPayment(null);

            await loadPayments();

        } catch (error) {

            console.error(
                "Erreur validation paiement :",
                error
            );

            alert(
                "Erreur lors de la validation du paiement."
            );

        } finally {

            setValidating(null);

        }

    };


    const filteredPayments = useMemo(() => {

        const value =
            search
                .toLowerCase()
                .trim();

        return payments.filter((payment) => {

            const matchesSearch =
                !value ||

                payment.pseudo
                    ?.toLowerCase()
                    .includes(value) ||

                payment.tournament
                    ?.toLowerCase()
                    .includes(value) ||

                payment.transaction_id
                    ?.toLowerCase()
                    .includes(value) ||

                payment.method
                    ?.toLowerCase()
                    .includes(value);


            const matchesFilter =
                filter === "all" ||

                (
                    filter === "success" &&
                    payment.status === "success"
                ) ||

                (
                    filter === "pending" &&
                    payment.status !== "success"
                );


            return (
                matchesSearch &&
                matchesFilter
            );

        });

    }, [payments, search, filter]);


    const successfulPayments =
        payments.filter(
            payment =>
                payment.status === "success"
        );


    const pendingPayments =
        payments.filter(
            payment =>
                payment.status !== "success"
        );


    const totalAmount =
        successfulPayments.reduce(
            (total, payment) =>
                total +
                Number(payment.amount || 0),
            0
        );


    const formatMoney = (amount) => {

        return Number(amount || 0)
            .toLocaleString("fr-FR");

    };


    return (

        <div className="admin-page">

            <Sidebar />


            <main className="admin-content payments-page">


                {/* =================================
                    HEADER
                ================================= */}

                <div className="payments-header">

                    <div>

                        <div className="admin-eyebrow">
                            ARENAFOOT FINANCE
                        </div>

                        <h1>
                            💳 Gestion des paiements
                        </h1>

                        <p>
                            Contrôlez les inscriptions
                            et les transactions ArenaFoot.
                        </p>

                    </div>


                    <button
                        className="payments-refresh"
                        onClick={loadPayments}
                    >
                        ↻ Actualiser
                    </button>

                </div>


                {/* =================================
                    STATISTIQUES
                ================================= */}

                <div className="payments-stats">


                    <div className="payment-stat-card">

                        <div className="payment-stat-icon blue">
                            💳
                        </div>

                        <div>

                            <span>
                                Transactions
                            </span>

                            <strong>
                                {payments.length}
                            </strong>

                        </div>

                    </div>


                    <div className="payment-stat-card">

                        <div className="payment-stat-icon green">
                            ✓
                        </div>

                        <div>

                            <span>
                                Paiements validés
                            </span>

                            <strong>
                                {successfulPayments.length}
                            </strong>

                        </div>

                    </div>


                    <div className="payment-stat-card">

                        <div className="payment-stat-icon orange">
                            ◷
                        </div>

                        <div>

                            <span>
                                En attente
                            </span>

                            <strong>
                                {pendingPayments.length}
                            </strong>

                        </div>

                    </div>


                    <div className="payment-stat-card money">

                        <div className="payment-stat-icon purple">
                            💰
                        </div>

                        <div>

                            <span>
                                Total encaissé
                            </span>

                            <strong>
                                {formatMoney(totalAmount)}
                                {" "}
                                <small>FCFA</small>
                            </strong>

                        </div>

                    </div>

                </div>


                {/* =================================
                    TOOLBAR
                ================================= */}

                <div className="payments-toolbar">


                    <div className="payments-search">

                        <span>
                            🔎
                        </span>

                        <input
                            type="text"
                            placeholder="Rechercher un joueur, tournoi ou transaction..."
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                        />


                        {search && (

                            <button
                                onClick={() =>
                                    setSearch("")
                                }
                            >
                                ✕
                            </button>

                        )}

                    </div>


                    <div className="payments-filters">

                        <button
                            className={
                                filter === "all"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setFilter("all")
                            }
                        >
                            Tous
                        </button>


                        <button
                            className={
                                filter === "success"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setFilter("success")
                            }
                        >
                            ✓ Validés
                        </button>


                        <button
                            className={
                                filter === "pending"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setFilter("pending")
                            }
                        >
                            ◷ En attente
                        </button>

                    </div>

                </div>


                {/* =================================
                    PANEL
                ================================= */}

                <section className="payments-panel">


                    <div className="payments-panel-header">

                        <div>

                            <h2>
                                Transactions
                            </h2>

                            <p>
                                {filteredPayments.length}
                                {" "}
                                transaction
                                {filteredPayments.length > 1
                                    ? "s"
                                    : ""
                                }
                            </p>

                        </div>


                        <div className="payment-secure">

                            🔐

                            <span>
                                Paiements sécurisés
                            </span>

                        </div>

                    </div>


                    {loading ? (

                        <div className="payments-loading">

                            <div className="loading-spinner"></div>

                            <p>
                                Chargement des paiements...
                            </p>

                        </div>

                    ) : filteredPayments.length === 0 ? (

                        <div className="payments-empty">

                            <div>
                                💳
                            </div>

                            <h3>
                                Aucun paiement trouvé
                            </h3>

                            <p>
                                Aucune transaction ne correspond
                                à votre recherche.
                            </p>

                        </div>

                    ) : (

                        <div className="payments-list">

                            {filteredPayments.map(
                                (payment, index) => {

                                    const isSuccess =
                                        payment.status ===
                                        "success";

                                    return (

                                        <article
                                            key={payment.id}
                                            className="payment-card"
                                            style={{
                                                animationDelay:
                                                    `${index * 45}ms`
                                            }}
                                        >


                                            {/* ICÔNE */}

                                            <div
                                                className={
                                                    `payment-method-icon ${
                                                        isSuccess
                                                            ? "success"
                                                            : "pending"
                                                    }`
                                                }
                                            >
                                                💳
                                            </div>


                                            {/* INFORMATIONS */}

                                            <div className="payment-main">


                                                <div className="payment-user">

                                                    <div className="payment-avatar">

                                                        {
                                                            payment.pseudo
                                                                ?.charAt(0)
                                                                ?.toUpperCase()
                                                            ||
                                                            "?"
                                                        }

                                                    </div>


                                                    <div>

                                                        <strong>
                                                            {
                                                                payment.pseudo
                                                                ||
                                                                "Joueur"
                                                            }
                                                        </strong>

                                                        <span>
                                                            🏆
                                                            {" "}
                                                            {
                                                                payment.tournament
                                                                ||
                                                                "Tournoi"
                                                            }
                                                        </span>

                                                    </div>

                                                </div>


                                                <div className="payment-details">

                                                    <div>

                                                        <span>
                                                            Montant
                                                        </span>

                                                        <strong className="payment-amount">
                                                            +
                                                            {" "}
                                                            {formatMoney(
                                                                payment.amount
                                                            )}
                                                            {" "}
                                                            FCFA
                                                        </strong>

                                                    </div>


                                                    <div>

                                                        <span>
                                                            Méthode
                                                        </span>

                                                        <strong>
                                                            {payment.method}
                                                        </strong>

                                                    </div>


                                                    <div>

                                                        <span>
                                                            Transaction
                                                        </span>

                                                        <strong className="transaction-id">
                                                            {
                                                                payment.transaction_id
                                                                ||
                                                                "—"
                                                            }
                                                        </strong>

                                                    </div>


                                                    <div>

                                                        <span>
                                                            Date
                                                        </span>

                                                        <strong>
                                                            {
                                                                payment.created_at
                                                                    ? new Date(
                                                                        payment.created_at
                                                                    ).toLocaleString(
                                                                        "fr-FR"
                                                                    )
                                                                    : "—"
                                                            }
                                                        </strong>

                                                    </div>

                                                </div>

                                            </div>


                                            {/* DROITE */}

                                            <div className="payment-actions">


                                                <span
                                                    className={
                                                        isSuccess
                                                            ? "payment-status success"
                                                            : "payment-status pending"
                                                    }
                                                >

                                                    {isSuccess
                                                        ? "✓ Validé"
                                                        : "◷ En attente"
                                                    }

                                                </span>


                                                <button
                                                    className="payment-view-button"
                                                    onClick={() =>
                                                        setSelectedPayment(
                                                            payment
                                                        )
                                                    }
                                                >
                                                    👁
                                                </button>


                                                {!isSuccess && (

                                                    <button
                                                        className="payment-validate-button"
                                                        disabled={
                                                            validating ===
                                                            payment.id
                                                        }
                                                        onClick={() =>
                                                            setSelectedPayment(
                                                                payment
                                                            )
                                                        }
                                                    >

                                                        {validating ===
                                                        payment.id
                                                            ? "..."
                                                            : "✓ Valider"
                                                        }

                                                    </button>

                                                )}

                                            </div>

                                        </article>

                                    );

                                }
                            )}

                        </div>

                    )}

                </section>


            </main>


            {/* =================================
                MODAL PAIEMENT
            ================================= */}

            {selectedPayment && (

                <div
                    className="payment-modal-overlay"
                    onClick={() =>
                        setSelectedPayment(null)
                    }
                >

                    <div
                        className="payment-modal"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        <button
                            className="payment-modal-close"
                            onClick={() =>
                                setSelectedPayment(null)
                            }
                        >
                            ✕
                        </button>


                        <div className="payment-modal-icon">
                            💳
                        </div>


                        <h2>
                            Détails du paiement
                        </h2>


                        <div className="payment-modal-info">

                            <div>
                                <span>
                                    👤 Joueur
                                </span>

                                <strong>
                                    {
                                        selectedPayment.pseudo
                                    }
                                </strong>
                            </div>


                            <div>
                                <span>
                                    🏆 Tournoi
                                </span>

                                <strong>
                                    {
                                        selectedPayment.tournament
                                    }
                                </strong>
                            </div>


                            <div>
                                <span>
                                    💰 Montant
                                </span>

                                <strong>
                                    {
                                        formatMoney(
                                            selectedPayment.amount
                                        )
                                    }
                                    {" "}
                                    FCFA
                                </strong>
                            </div>


                            <div>
                                <span>
                                    💳 Méthode
                                </span>

                                <strong>
                                    {
                                        selectedPayment.method
                                    }
                                </strong>
                            </div>


                            <div>
                                <span>
                                    🆔 Transaction
                                </span>

                                <strong>
                                    {
                                        selectedPayment.transaction_id
                                    }
                                </strong>
                            </div>


                            <div>
                                <span>
                                    📌 Statut
                                </span>

                                <strong>
                                    {
                                        selectedPayment.status ===
                                        "success"
                                            ? "✓ Validé"
                                            : "◷ En attente"
                                    }
                                </strong>
                            </div>

                        </div>


                        {selectedPayment.status !== "success" && (

                            <button
                                className="modal-validate-payment"
                                disabled={
                                    validating ===
                                    selectedPayment.id
                                }
                                onClick={() =>
                                    handleValidate(
                                        selectedPayment.id
                                    )
                                }
                            >

                                {validating ===
                                selectedPayment.id
                                    ? "⏳ Validation..."
                                    : "✅ Valider le paiement"
                                }

                            </button>

                        )}

                    </div>

                </div>

            )}

        </div>

    );

}

export default AdminPayments;