const API = "https://arenafoot-backend-production.up.railway.app/api/admin";

const getAdminHeaders = () => {
  const token = localStorage.getItem("adminToken");

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  };
};


// ==========================================
// JOUEURS
// ==========================================

export const getPlayers = async () => {

  const response = await fetch(`${API}/players`, {
    headers: getAdminHeaders()
  });

  const data = await response.json();

  console.log("API PLAYERS :", data);

  return data;
};


export const getPlayer = async (id) => {

  const response = await fetch(`${API}/player/${id}`, {
    headers: getAdminHeaders()
  });

  const data = await response.json();

  return data;
};


export const banPlayer = async (id) => {

  const response = await fetch(`${API}/ban/${id}`, {
    method: "PUT",
    headers: getAdminHeaders()
  });

  return await response.json();
};


export const deletePlayer = async (id) => {

  const response = await fetch(`${API}/player/${id}`, {
    method: "DELETE",
    headers: getAdminHeaders()
  });

  return await response.json();
};


// ==========================================
// TOURNOIS
// ==========================================

export const getTournaments = async () => {

  const response = await fetch(`${API}/tournaments`, {
    headers: getAdminHeaders()
  });

  const data = await response.json();

  console.log("API TOURNAMENTS :", data);

  return data;
};


export const deleteTournament = async (id) => {

  const response = await fetch(
    `${API}/tournament/${id}`,
    {
      method: "DELETE",
      headers: getAdminHeaders()
    }
  );

  return await response.json();
};


export const getTournamentPlayers = async (id) => {

  const response = await fetch(
    `${API}/tournament/${id}/players`,
    {
      headers: getAdminHeaders()
    }
  );

  return await response.json();
};


export const createTestPlayers = async (tournamentId) => {

  const response = await fetch(
    `${API}/test-players/${tournamentId}`,
    {
      method: "POST",
      headers: getAdminHeaders()
    }
  );

  return await response.json();
};


export const generateBracket = async (tournamentId) => {

  const response = await fetch(
    `${API}/tournament/${tournamentId}/generate-bracket`,
    {
      method: "POST",
      headers: getAdminHeaders()
    }
  );

  return await response.json();
};


// ==========================================
// PAIEMENTS
// ==========================================

export const getPayments = async () => {

  const response = await fetch(
    `${API}/payments`,
    {
      headers: getAdminHeaders()
    }
  );

  return await response.json();
};


export const validatePayment = async (id) => {

  const response = await fetch(
    `${API}/payment/${id}`,
    {
      method: "PUT",
      headers: getAdminHeaders()
    }
  );

  return await response.json();
};


// ==========================================
// RÉCOMPENSES
// ==========================================

export const getRewards = async () => {

  const response = await fetch(
    `${API}/rewards`,
    {
      headers: getAdminHeaders()
    }
  );

  return await response.json();
};


export const sendReward = async (id) => {

  const response = await fetch(
    `${API}/reward/${id}`,
    {
      method: "PUT",
      headers: getAdminHeaders()
    }
  );

  return await response.json();
};