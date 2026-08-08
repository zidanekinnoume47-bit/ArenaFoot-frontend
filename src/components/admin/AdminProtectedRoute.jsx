import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function AdminProtectedRoute() {

  const token = localStorage.getItem("adminToken");
  const adminUser = localStorage.getItem("adminUser");

  // Aucun token ou aucune donnée admin
  if (!token || !adminUser) {
    return (
      <Navigate
        to="/admin/arenafoot-control"
        replace
      />
    );
  }

  let user;

  try {
    user = JSON.parse(adminUser);
  } catch (error) {

    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");

    return (
      <Navigate
        to="/admin/arenafoot-control"
        replace
      />
    );
  }

  // Vérification du rôle
  if (user.role !== "admin") {

    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");

    return (
      <Navigate
        to="/admin/arenafoot-control"
        replace
      />
    );
  }

  // Vérification de l'expiration du JWT
  try {

    const payload = JSON.parse(
      atob(token.split(".")[1])
    );

    const currentTime = Math.floor(
      Date.now() / 1000
    );

    if (payload.exp && payload.exp < currentTime) {

      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");

      return (
        <Navigate
          to="/admin/arenafoot-control"
          replace
        />
      );
    }

  } catch (error) {

    console.error(
      "Token admin invalide :",
      error
    );

    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");

    return (
      <Navigate
        to="/admin/arenafoot-control"
        replace
      />
    );
  }

  return <Outlet />;
}

export default AdminProtectedRoute;