import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function AdminRoute() {

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token || !user) {
        return <Navigate to="/admin/login" replace />;
    }

    if (user.role !== "admin") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
}

export default AdminRoute;