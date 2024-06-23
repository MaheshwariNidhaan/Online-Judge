import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./AdminProblemsPage.css";

// Access the backend URL from environment variables
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const AdminProblemsPage = () => {
  const [problems, setProblems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BACKEND_URL}/problems`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setProblems(data))
      .catch((error) => console.error("Error fetching problems:", error));
  }, []);

  const deleteProblem = (id) => {
    if (!window.confirm("Are you sure you want to delete this problem?"))
      return;

    fetch(`${BACKEND_URL}/problems/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => {
        setProblems(problems.filter((problem) => problem._id !== id));
      })
      .catch((error) => console.error("Error deleting problem:", error));
  };

  return (
    <div className="admin-problems-page">
      {/* <Navbar /> */}
      <h1>Manage Problems</h1>
      <button
        onClick={() => navigate("/problems/new")}
        className="add-problem-btn"
      >
        Add Problem
      </button>
      <table className="problems-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Difficulty</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem) => (
            <tr key={problem._id}>
              <td>{problem.title}</td>
              <td>{problem.difficulty}</td>
              <td className="actions">
                <Link to={`/problems/${problem._id}/edit`}>Edit</Link>
                <button onClick={() => deleteProblem(problem._id)}>
                  Delete
                </button>
                <Link to={`/problems/${problem._id}`}>Attempt</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProblemsPage;
