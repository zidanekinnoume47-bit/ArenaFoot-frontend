const API = "https://arenafoot-backend-production.up.railway.app/api/admin";


export const getPlayers = async()=>{

const token =
localStorage.getItem("token");


const response =
await fetch(
`${API}/players`,
{
headers:{
Authorization: `Bearer ${token}`
}
}
);

const data = await response.json();

console.log("API :", data);

return data;

};



export const getTournaments = async()=>{


const token =
localStorage.getItem("token");


const response =
await fetch(
`${API}/tournaments`,
{
headers:{
Authorization: `Bearer ${token}`
}
}
);

const data = await response.json();

console.log("API :", data);

return data;

};


export const getPlayer = async (id) => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API}/player/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    const data = await response.json();

    return data;

};

export const banPlayer = async (id) => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API}/ban/${id}`,
        {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return await response.json();

};



export const deletePlayer = async (id) => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API}/player/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return await response.json();

};



export const deleteTournament = async (id) => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API}/tournament/${id}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return await response.json();

};

export const getRewards = async () => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API}/rewards`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return await response.json();

};


export const sendReward = async (id) => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API}/reward/${id}`,
        {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return await response.json();

};

export const getTournamentPlayers = async (id) => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API}/tournament/${id}/players`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return await response.json();

};


export const getPayments = async () => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API}/payments`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return await response.json();

};



export const validatePayment = async (id) => {

    const token = localStorage.getItem("token");

    const response = await fetch(
        `${API}/payment/${id}`,
        {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return await response.json();

};