import React, { useEffect, useState } from "react";
import Sidebar from "../components/admin/Sidebar";
import {
    getSettings,
    updateSettings
} from "../service/settingService";

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

    useEffect(() => {

        loadSettings();

    }, []);

    const loadSettings = async () => {

        const data = await getSettings();

        setSettings(data);

    };

    const handleChange = (e) => {

        setSettings({
            ...settings,
            [e.target.name]: e.target.value
        });

    };

    const save = async () => {

        const data = await updateSettings(settings);

        alert(data.message);

    };

    return (

        <div className="admin-page">

            <Sidebar />

            <div style={{
                marginLeft: "280px",
                padding: "20px"
            }}>

                <h1>⚙️ Paramètres</h1>

                <input
                    name="site_name"
                    placeholder="Nom du site"
                    value={settings.site_name}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    name="entry_fee"
                    type="number"
                    placeholder="Participation"
                    value={settings.entry_fee}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    name="reward"
                    type="number"
                    placeholder="Récompense"
                    value={settings.reward}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    name="whatsapp"
                    placeholder="WhatsApp"
                    value={settings.whatsapp}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    name="phone"
                    placeholder="Téléphone"
                    value={settings.phone}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    name="email"
                    placeholder="Email"
                    value={settings.email}
                    onChange={handleChange}
                />

                <br /><br />

                <label>Inscriptions</label>

                <select
                    name="registration"
                    value={settings.registration}
                    onChange={handleChange}
                >
                    <option value="open">Ouvertes</option>
                    <option value="closed">Fermées</option>
                </select>

                <br /><br />

                <label>Paiements</label>

                <select
                    name="payment"
                    value={settings.payment}
                    onChange={handleChange}
                >
                    <option value="enabled">Activés</option>
                    <option value="disabled">Désactivés</option>
                </select>

                <br /><br />

                <button onClick={save}>
                    💾 Enregistrer
                </button>

            </div>

        </div>

    );

}

export default AdminSettings;