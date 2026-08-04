import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import RankingCard from "./components/RankingCard.jsx";
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
import AdminPlayers from "./pages/AdminPlayers";
import AdminTournaments from "./pages/AdminTournaments";
import AdminRewards from "./pages/AdminRewards";
import AdminPayments from "./pages/AdminPayments";
import AdminRooms from "./pages/AdminRooms";


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
        <Route path="/ranking" element={<RankingCard />} />
        <Route path="/bracket" element={<Bracket />} />
        <Route path="/tournaments/:id/bracket" element={<Bracket />} />
        <Route path="/tournaments/:id" element={<TournamentDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/room/:id" element={<Room/>} />
        <Route path="/admin/players" element={<AdminPlayers />} />
        <Route path="/admin/tournaments" element={<AdminTournaments />} />
        <Route path="/admin/rewards" element={<AdminRewards />} />
        <Route path="/admin/payments" element={<AdminPayments />} />
        <Route path="/admin/rooms" element={<AdminRooms />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;