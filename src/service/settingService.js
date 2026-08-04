const API = "https://arenafoot-backend-production.up.railway.app/api/settings";

export const getSettings = async () => {

    const response = await fetch(API);

    return await response.json();

};

export const updateSettings = async (settings) => {

    const response = await fetch(API, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(settings)

    });

    return await response.json();

};