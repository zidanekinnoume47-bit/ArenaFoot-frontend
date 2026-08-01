import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Rankingcard from "./components/Rankingcard.jsx"; // ou le nom de ton fichier de classement
import Home from "./pages/Home";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Register from './pages/Register';
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Room from "./pages/Room";
import Tournaments from "./pages/Tournaments";
import Payment from "./pages/Payment.jsx";
import Bracket from "./pages/Bracket";
import TournamentDetails from "./pages/TournamentDetails.jsx";
import Profile from "./pages/Profile.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/ranking" element={<Rankingcard />} />
        <Route path="/bracket" element={<Bracket />} />
        <Route path="/tournaments/:id/bracket" element={<Bracket />} />
        <Route path="/tournaments/:id" element={<TournamentDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/room/:id" element={<Room/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;