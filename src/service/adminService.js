const API = "https://arenafoot-backend-production.up.railway.app/api/admin";


export const getPlayers = async()=>{

const token =
localStorage.getItem("token");


const response =
await fetch(
`${API}/players`,
{
headers:{
Authorization: token
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
Authorization: token
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
                Authorization: token
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
                Authorization: token
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
                Authorization: token
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
                Authorization: token
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
                Authorization: token
            }
        }
    );

    return await response.json();

};