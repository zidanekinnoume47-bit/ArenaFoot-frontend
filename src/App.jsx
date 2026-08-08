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
import AdminRanking from "./pages/AdminRanking";
import AdminSettings from "./pages/AdminSettings";
import AdminMatches from "./pages/AdminMatches";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyResetCode from "./pages/VerifyResetCode";
import ResetPassword from "./pages/ResetPassword";
import AdminLogin from "./components/admin/AdminLogin";
import AdminForgotPassword from "./components/admin/AdminForgotPassword";
import AdminVerifyResetCode from "./components/admin/AdminVerifyResetCode";
import AdminResetPassword from "./components/admin/AdminResetPassword";
import AdminProtectedRoute from "./components/admin/AdminProtectedRoute";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/ranking" element={<RankingCard />} />
        <Route path="/bracket" element={<Bracket />} />
        <Route path="/tournaments/:id/bracket" element={<Bracket />} />
        <Route path="/tournaments/:id" element={<TournamentDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/room/:id" element={<Room/>} />
        <Route element={<AdminProtectedRoute />}>

          <Route path="/admin" element={<AdminDashboard />} />

          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          <Route path="/admin/players" element={<AdminPlayers />} />

          <Route path="/admin/tournaments" element={<AdminTournaments />} />

          <Route path="/admin/rewards" element={<AdminRewards />} />

          <Route path="/admin/payments" element={<AdminPayments />} />

          <Route path="/admin/rooms" element={<AdminRooms />} />

          <Route path="/admin/ranking" element={<AdminRanking />} />

          <Route path="/admin/settings" element={<AdminSettings />} />

          <Route path="/admin/matches" element={<AdminMatches />} />

        </Route>
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password"element={<ForgotPassword />}/>
        <Route path="/verify-reset-code"element={<VerifyResetCode />}/>
        <Route path="/reset-password"element={<ResetPassword />}/>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/arenafoot-control"element={<AdminLogin />}/>
        <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
        <Route path="/admin/verify-reset-code" element={<AdminVerifyResetCode />} />
        <Route path="/admin/reset-password" element={<AdminResetPassword />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;