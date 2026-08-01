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


return response.json();

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


return response.json();


};