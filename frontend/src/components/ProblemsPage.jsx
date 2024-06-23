import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./ProblemsPage.css";

// Access the backend URL from environment variables
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ProblemsPage = () => {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/problems`)
      .then((response) => response.json())
      .then((data) => setProblems(data))
      .catch((error) => console.error("Error fetching problems:", error));
  }, []);

  return (
    <div className="problems-page">
      {/* <Navbar /> */}
      <h1>Problems</h1>
      <table className="problems-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Difficulty</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem) => (
            <tr key={problem._id}>
              <td>{problem.title}</td>
              <td>{problem.difficulty}</td>
              <td>
                <Link to={`/problems/${problem._id}`}>Attempt</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProblemsPage;
