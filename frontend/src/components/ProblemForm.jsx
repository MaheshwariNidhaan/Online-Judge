import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProblemForm.css";

// Access the backend URL from environment variables
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ProblemForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    difficulty: "Easy",
    statement: "",
    sampleInput1: "",
    sampleOutput1: "",
    sampleInput2: "",
    sampleOutput2: "",
    hiddenTestCases: [],
  });

  useEffect(() => {
    if (id) {
      fetch(`${BACKEND_URL}/problems/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // Ensure hiddenTestCases is always an array
          setForm({
            ...data,
            hiddenTestCases: data.hiddenTestCases || [],
          });
        })
        .catch((error) => console.error("Error fetching problem:", error));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleHiddenChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTestCases = [...form.hiddenTestCases];
    updatedTestCases[index][name] = value;
    setForm((prev) => ({ ...prev, hiddenTestCases: updatedTestCases }));
  };

  const addHiddenTestCase = () => {
    setForm((prev) => ({
      ...prev,
      hiddenTestCases: [...prev.hiddenTestCases, { input: "", output: "" }],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = id
      ? `${BACKEND_URL}/problems/${id}`
      : `${BACKEND_URL}/problems`;
    const method = id ? "PATCH" : "POST";

    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(form),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        return response.json();
      })
      .then(() => navigate("/AdminProblemsPage"))
      .catch((error) => console.error("Error saving problem:", error));
  };

  return (
    <div className="problem-form">
      <h1>{id ? "Edit Problem" : "Add Problem"}</h1>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <label>Difficulty</label>
        <select
          name="difficulty"
          value={form.difficulty}
          onChange={handleChange}
          required
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <label>Statement</label>
        <textarea
          name="statement"
          value={form.statement}
          onChange={handleChange}
          required
        />
        <label>Sample Input 1</label>
        <textarea
          name="sampleInput1"
          value={form.sampleInput1}
          onChange={handleChange}
          required
        />
        <label>Sample Output 1</label>
        <textarea
          name="sampleOutput1"
          value={form.sampleOutput1}
          onChange={handleChange}
          required
        />
        <label>Sample Input 2</label>
        <textarea
          name="sampleInput2"
          value={form.sampleInput2}
          onChange={handleChange}
          required
        />
        <label>Sample Output 2</label>
        <textarea
          name="sampleOutput2"
          value={form.sampleOutput2}
          onChange={handleChange}
          required
        />
        <h3>Hidden Test Cases</h3>
        {form.hiddenTestCases.map((testCase, index) => (
          <div key={index} className="hidden-test-case">
            <label>Input</label>
            <textarea
              name="input"
              value={testCase.input}
              onChange={(e) => handleHiddenChange(index, e)}
            />
            <label>Output</label>
            <textarea
              name="output"
              value={testCase.output}
              onChange={(e) => handleHiddenChange(index, e)}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addHiddenTestCase}
          className="add-test-case-btn"
        >
          Add Hidden Test Case
        </button>
        <button type="submit">{id ? "Update" : "Create"} Problem</button>
      </form>
    </div>
  );
};

export default ProblemForm;
