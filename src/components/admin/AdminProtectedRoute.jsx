import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function AdminProtectedRoute() {

  const token = localStorage.getItem("adminToken");

  // Aucun token admin
  if (!token) {
    return <Navigate to="/admin/arenafoot-control" replace />;
  }

  // Token présent → accès aux pages admin
  return <Outlet />;
}

export default AdminProtectedRoute;