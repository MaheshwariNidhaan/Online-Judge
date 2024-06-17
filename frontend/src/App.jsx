import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Navbar from "./components/Navbar"; // Import Navbar
import About from "./components/About";
import ProblemsPage from "./components/ProblemsPage";
import ProblemDetailPage from "./components/ProblemDetailPage";
import Leaderboard from "./components/Leaderboard";
import AdminProblemsPage from "./components/AdminProblemPage";
import ProblemForm from "./components/ProblemForm";

const AppContent = ({ user, setUser }) => {
  const location = useLocation();
  const navigate = useNavigate(); // Now use navigate here

  // Define the paths where the Navbar should be hidden
  const hideNavbarPaths = ["/", "/login", "/signup"];
  const shouldHideNavbar = hideNavbarPaths.includes(
    location.pathname.toLowerCase()
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login", { replace: true }); // Redirect to login page after logout
  };

  return (
    <>
      {!shouldHideNavbar && <Navbar user={user} onLogout={handleLogout} />}
      <Routes>
        <Route
          path="/"
          element={<Login onLogin={(token) => handleLogin(token, navigate)} />}
        />
        <Route
          path="/login"
          element={<Login onLogin={(token) => handleLogin(token, navigate)} />}
        />
        <Route path="/signup" element={<Signup />} />

        <Route path="/about" element={<About />} />
        <Route path="/problems" element={<ProblemsPage />} />
        <Route path="/problems/:id" element={<ProblemDetailPage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />

        {user?.role === "admin" && (
          <>
            <Route
              path="/AdminProblemsPage"
              element={<AdminProblemsPage user={user} />}
            />
            <Route path="/problems/new" element={<ProblemForm />} />
            <Route path="/problems/:id/edit" element={<ProblemForm />} />
          </>
        )}
      </Routes>
    </>
  );
};

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = JSON.parse(atob(token.split(".")[1]));
      setUser(userData);
    }
  }, []);

  const handleLogin = (token, navigate) => {
    localStorage.setItem("token", token);
    const userData = JSON.parse(atob(token.split(".")[1]));
    setUser(userData);
    navigate("/problems", { replace: true }); // Redirect to problems page after login
  };

  return (
    <Router>
      <AppContent user={user} setUser={setUser} />
    </Router>
  );
}

export default App;
