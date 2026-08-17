import React, { useEffect, useState } from "react";
import Sidebar from "../components/admin/Sidebar";
import {
    getSettings,
    updateSettings
} from "../service/settingService";

import "../styles/admin.css";

function AdminSettings() {

    const [settings, setSettings] = useState({

        site_name: "",
        entry_fee: "",
        reward: "",
        whatsapp: "",
        phone: "",
        email: "",
        registration: "open",
        payment: "enabled"

    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);


    useEffect(() => {

        loadSettings();

    }, []);


    const loadSettings = async () => {

        try {

            setLoading(true);

            const data = await getSettings();

            if (data) {
                setSettings(data);
            }

        } catch (error) {

            console.error(
                "Erreur chargement paramètres :",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    const handleChange = (e) => {

        setSaved(false);

        setSettings({
            ...settings,
            [e.target.name]: e.target.value
        });

    };


    const save = async () => {

        try {

            setSaving(true);

            const data =
                await updateSettings(settings);

            setSaved(true);

            alert(
                data.message ||
                "Paramètres enregistrés avec succès."
            );

        } catch (error) {

            console.error(
                "Erreur sauvegarde :",
                error
            );

            alert(
                "Impossible d'enregistrer les paramètres."
            );

        } finally {

            setSaving(false);

        }

    };


    if (loading) {

        return (

            <div className="admin-page">

                <Sidebar />

                <main className="admin-content settings-page">

                    <div className="settings-loading">

                        <div className="loading-spinner"></div>

                        <p>
                            Chargement des paramètres...
                        </p>

                    </div>

                </main>

            </div>

        );

    }


    return (

        <div className="admin-page">

            <Sidebar />


            <main className="admin-content settings-page">


                {/* =================================
                    HEADER
                ================================= */}

                <div className="settings-header">

                    <div>

                        <div className="admin-eyebrow">
                            ARENAFOOT CONTROL CENTER
                        </div>

                        <h1>
                            ⚙️ Paramètres
                        </h1>

                        <p>
                            Configurez le fonctionnement
                            général de votre plateforme.
                        </p>

                    </div>


                    <div className="settings-status">

                        <span></span>

                        Système opérationnel

                    </div>

                </div>


                {/* =================================
                    SITE
                ================================= */}

                <section className="settings-section">


                    <div className="settings-section-header">

                        <div className="settings-section-icon blue">
                            🌐
                        </div>

                        <div>

                            <h2>
                                Identité du site
                            </h2>

                            <p>
                                Informations principales
                                d'ArenaFoot.
                            </p>

                        </div>

                    </div>


                    <div className="settings-form-grid">


                        <div className="settings-field full">

                            <label>
                                Nom de la plateforme
                            </label>

                            <div className="settings-input-wrapper">

                                <span>🏆</span>

                                <input
                                    name="site_name"
                                    placeholder="ArenaFoot"
                                    value={
                                        settings.site_name
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                        </div>

                    </div>

                </section>


                {/* =================================
                    TOURNOIS
                ================================= */}

                <section className="settings-section">


                    <div className="settings-section-header">

                        <div className="settings-section-icon purple">
                            🏆
                        </div>

                        <div>

                            <h2>
                                Tournois & récompenses
                            </h2>

                            <p>
                                Définissez les montants
                                appliqués aux tournois.
                            </p>

                        </div>

                    </div>


                    <div className="settings-form-grid">


                        <div className="settings-field">

                            <label>
                                Participation
                            </label>

                            <div className="settings-input-wrapper">

                                <span>
                                    💰
                                </span>

                                <input
                                    name="entry_fee"
                                    type="number"
                                    placeholder="Ex : 2000"
                                    value={
                                        settings.entry_fee
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                                <small>
                                    FCFA
                                </small>

                            </div>

                        </div>


                        <div className="settings-field">

                            <label>
                                Récompense
                            </label>

                            <div className="settings-input-wrapper">

                                <span>
                                    🥇
                                </span>

                                <input
                                    name="reward"
                                    type="number"
                                    placeholder="Ex : 20000"
                                    value={
                                        settings.reward
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                                <small>
                                    FCFA
                                </small>

                            </div>

                        </div>

                    </div>

                </section>


                {/* =================================
                    CONTACT
                ================================= */}

                <section className="settings-section">


                    <div className="settings-section-header">

                        <div className="settings-section-icon green">
                            📞
                        </div>

                        <div>

                            <h2>
                                Coordonnées
                            </h2>

                            <p>
                                Moyens de contact affichés
                                aux utilisateurs.
                            </p>

                        </div>

                    </div>


                    <div className="settings-form-grid">


                        <div className="settings-field">

                            <label>
                                WhatsApp
                            </label>

                            <div className="settings-input-wrapper">

                                <span>
                                    💬
                                </span>

                                <input
                                    name="whatsapp"
                                    placeholder="+229..."
                                    value={
                                        settings.whatsapp
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                        </div>


                        <div className="settings-field">

                            <label>
                                Téléphone
                            </label>

                            <div className="settings-input-wrapper">

                                <span>
                                    📱
                                </span>

                                <input
                                    name="phone"
                                    placeholder="+229..."
                                    value={
                                        settings.phone
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                        </div>


                        <div className="settings-field full">

                            <label>
                                Email
                            </label>

                            <div className="settings-input-wrapper">

                                <span>
                                    ✉️
                                </span>

                                <input
                                    name="email"
                                    type="email"
                                    placeholder="contact@arenafoot.com"
                                    value={
                                        settings.email
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                        </div>

                    </div>

                </section>


                {/* =================================
                    CONTRÔLE
                ================================= */}

                <section className="settings-section">


                    <div className="settings-section-header">

                        <div className="settings-section-icon orange">
                            🛡️
                        </div>

                        <div>

                            <h2>
                                Contrôle de la plateforme
                            </h2>

                            <p>
                                Activez ou désactivez
                                certaines fonctionnalités.
                            </p>

                        </div>

                    </div>


                    <div className="settings-controls">


                        {/* INSCRIPTIONS */}

                        <div className="settings-control">

                            <div className="control-left">

                                <div className="control-icon">
                                    👥
                                </div>

                                <div>

                                    <strong>
                                        Inscriptions
                                    </strong>

                                    <span>
                                        Autoriser les joueurs
                                        à rejoindre les tournois.
                                    </span>

                                </div>

                            </div>


                            <select
                                name="registration"
                                value={
                                    settings.registration
                                }
                                onChange={
                                    handleChange
                                }
                                className={
                                    settings.registration ===
                                    "open"
                                        ? "status-open"
                                        : "status-closed"
                                }
                            >

                                <option value="open">
                                    🟢 Ouvertes
                                </option>

                                <option value="closed">
                                    🔴 Fermées
                                </option>

                            </select>

                        </div>


                        {/* PAIEMENTS */}

                        <div className="settings-control">

                            <div className="control-left">

                                <div className="control-icon">
                                    💳
                                </div>

                                <div>

                                    <strong>
                                        Paiements
                                    </strong>

                                    <span>
                                        Autoriser les paiements
                                        d'inscription.
                                    </span>

                                </div>

                            </div>


                            <select
                                name="payment"
                                value={
                                    settings.payment
                                }
                                onChange={
                                    handleChange
                                }
                                className={
                                    settings.payment ===
                                    "enabled"
                                        ? "status-open"
                                        : "status-closed"
                                }
                            >

                                <option value="enabled">
                                    🟢 Activés
                                </option>

                                <option value="disabled">
                                    🔴 Désactivés
                                </option>

                            </select>

                        </div>

                    </div>

                </section>


                {/* =================================
                    SAVE
                ================================= */}

                <div className="settings-save-bar">


                    <div>

                        {saved ? (

                            <span className="settings-saved">
                                ✓ Modifications enregistrées
                            </span>

                        ) : (

                            <span>
                                Les modifications ne sont
                                pas encore enregistrées.
                            </span>

                        )}

                    </div>


                    <button
                        className="settings-save-button"
                        onClick={save}
                        disabled={saving}
                    >

                        {saving
                            ? "⏳ Enregistrement..."
                            : "💾 Enregistrer les paramètres"
                        }

                    </button>

                </div>

            </main>

        </div>

    );

}

export default AdminSettings;