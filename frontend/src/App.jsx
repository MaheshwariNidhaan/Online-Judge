import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
// import Navbar from "./components/Navbar";
import About from "./components/About";
import ProblemsPage from "./components/ProblemsPage";
import ProblemDetailPage from "./components/ProblemDetailPage";
import Leaderboard from "./components/Leaderboard";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Login />} path="/Login" />
        <Route element={<Signup />} path="/Signup" />

        <Route element={<About />} path="/About" />
        <Route element={<ProblemsPage />} path="/Problems" />
        <Route element={<ProblemDetailPage />} path="/problems/:id" />
        <Route element={<Leaderboard />} path="/Leaderboard" />
        {/* <Route element={<ProtectedRoutes />}>
          <Route element={<About />} path="/About" />
          <Route element={<Problems />} path="/Problems" />
          <Route element={<Leaderboard />} path="/Leaderboard" />
        </Route> */}
      </Routes>
    </Router>
  );
}
export default App;
