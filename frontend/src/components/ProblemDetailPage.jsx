import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AceEditor from "react-ace";
import ace from "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/ext-language_tools"; // Import language tools for code suggestions
import "./ProblemDetailPage.css";

// Set the base path to the public directory
ace.config.set("basePath", "/ace");

// Dynamically import Ace Editor modes and themes
const loadAceModules = async () => {
  await import("ace-builds/src-noconflict/mode-c_cpp");
  await import("ace-builds/src-noconflict/mode-java");
  await import("ace-builds/src-noconflict/mode-python");
  await import("ace-builds/src-noconflict/theme-github");
};

// Access the backend URL from environment variables
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const ProblemDetailPage = () => {
  const { id } = useParams();
  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [code, setCode] = useState(`#include <iostream>
using namespace std;
int main() {
    return 0;
}`);
  const [language, setLanguage] = useState("cpp");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState([]);
  const [verdict, setVerdict] = useState(null);

  const boilerplateCodes = {
    cpp: `#include <iostream>
using namespace std;
int main() {
    return 0;
}`,
    java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
    py: `if __name__ == "__main__":
    print("Hello, World!")
`,
  };

  useEffect(() => {
    loadAceModules();
  }, []);

  useEffect(() => {
    fetch(`${BACKEND_URL}/problems/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProblem(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  const handleCodeChange = (newValue) => {
    setCode(newValue);
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);
    setCode(boilerplateCodes[selectedLanguage]);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleRunCode = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/run`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ language, code, input }),
      });

      const result = await response.json();
      setOutput(result.output || result.error || "Error running code");
    } catch (error) {
      setOutput("Error running code");
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language,
          code,
          problemId: id,
        }),
      });

      const result = await response.json();
      if (result.success) {
        // Extract the relevant parts for display
        const { submissions, hiddenTestCasesPassed, overallStatus } = result;
        const finalOutput = submissions.map((submission, index) => ({
          index: index + 1,
          status: submission.status,
        }));

        setOutput(finalOutput);
        setVerdict(hiddenTestCasesPassed ? "Accepted" : "Not Accepted");
      } else {
        setOutput(result.error || "Error submitting code");
        setVerdict(null);
      }
    } catch (error) {
      console.error("Error during code submission:", error);
      setOutput("Error submitting code");
      setVerdict(null);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!problem) {
    return <div>No problem found</div>;
  }

  return (
    <div className="problem-detail-page">
      <h1>{problem.title}</h1>
      <div className="problem-content">
        <div className="problem-statement">
          <h2>Problem Statement</h2>
          <p>{problem.statement}</p>
          <h3>Sample Input 1</h3>
          <pre>{problem.sampleInput1}</pre>
          <h3>Sample Output 1</h3>
          <pre>{problem.sampleOutput1}</pre>
          <h3>Sample Input 2</h3>
          <pre>{problem.sampleInput2}</pre>
          <h3>Sample Output 2</h3>
          <pre>{problem.sampleOutput2}</pre>
        </div>
        <div className="code-editor">
          <h2>Code Editor</h2>
          <div className="language-selector">
            <label htmlFor="language">Select Language:</label>
            <select
              id="language"
              value={language}
              onChange={handleLanguageChange}
            >
              <option value="cpp">C++</option>
              <option value="java">Java</option>
              <option value="py">Python</option>
            </select>
          </div>
          <AceEditor
            mode={
              language === "cpp"
                ? "c_cpp"
                : language === "py"
                ? "python"
                : "java"
            }
            theme="github"
            onChange={handleCodeChange}
            name="codeEditor"
            editorProps={{ $blockScrolling: true }}
            value={code}
            width="100%"
            height="400px"
            setOptions={{ fontSize: 18 }}
          />
          <div className="input-output-section">
            <textarea
              className="input-terminal"
              placeholder="Enter your input here..."
              value={input}
              onChange={handleInputChange}
            />
            <div className="editor-buttons">
              <button className="submit-button" onClick={handleSubmit}>
                Submit Code
              </button>
              <button className="run-button" onClick={handleRunCode}>
                Run Code
              </button>
            </div>
            {Array.isArray(output) && output.length > 0 && (
              <div className="output">
                <h3>Output</h3>
                <div className="test-case-results">
                  {output.map((result) => (
                    <div
                      key={result.index}
                      className={`test-case-result ${
                        result.status === "Correct"
                          ? "accepted"
                          : "not-accepted"
                      }`}
                    >
                      Test Case {result.index}
                    </div>
                  ))}
                </div>
                {verdict && (
                  <div
                    className={`result ${
                      verdict === "Accepted" ? "accepted" : "not-accepted"
                    }`}
                  >
                    Verdict: {verdict}
                  </div>
                )}
                <div
                  className={`test-case-result ${
                    verdict === "Accepted" ? "accepted" : "not-accepted"
                  }`}
                ></div>
              </div>
            )}
            {!Array.isArray(output) && (
              <div className="output">
                <h3>Output</h3>
                <pre>{output}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetailPage;
