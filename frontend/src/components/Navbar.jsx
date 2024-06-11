// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Navbar.css";

// const Navbar = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };

//   return (
//     <nav className="navbar">
//       <div className="nav-container">
//         <div className="logo">
//           <h1>Webcode: Online Judge</h1>
//         </div>
//         <ul className="nav-links">
//           <li>
//             <Link to="/about">About</Link>
//           </li>
//           <li>
//             <Link to="/problems">Problems</Link>
//           </li>
//           <li>
//             <Link to="/leaderboard">Leaderboard</Link>
//           </li>
//           <li>
//             <button onClick={handleLogout} className="logout-button">
//               Logout
//             </button>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true }); // Use replace to prevent back navigation
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          <h1>Webcode: Online Judge</h1>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/problems">Problems</Link>
          </li>
          <li>
            <Link to="/leaderboard">Leaderboard</Link>
          </li>
          <li>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
