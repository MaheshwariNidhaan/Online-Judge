const express = require("express");
const app = express();
const { DBConnection } = require("./database/db");
const User = require("./models/User");
const Problem = require("./models/problem");
const Submission = require("./models/Submission");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { generateFile } = require("./generateFile");
const { executeCpp } = require("./executeCpp");
const { generateInputFile } = require("./generateInputFile");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const cookieParser = require("cookie-parser");
const cors = require("cors");

DBConnection();

app.use(cors({ origin: "http://localhost:5173", credentials: true })); // Add CORS middleware

app.use(express.json()); // some middelwares
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//dummy route
app.get("/", (req, res) => {
  res.send("Hello, world, is coming from backend index.js");
});

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

//REGISTER Functionality

app.post("/signup", async (req, res) => {
  try {
    //get all the data from the frontend(firstname,lastname,...etc)
    const { firstname, lastname, email, password } = req.body; //initially all this data will be stored in req.body
    //this is destructing method in ES6

    //check if all the fields have been filled by the user or not
    if (!(firstname && lastname && email && password)) {
      return res.status(400).send("Please enter all the information/fields");
    }

    //More validation(check format of email)
    if (!validateEmail(email)) {
      return res.status(400).send("Invalid email format");
    }

    //check if user already exists
    /* user kidhar milega--> database me..so we create another folder db  
  user ki email is unique so we can check if the user is unique or not using his email*/
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).send("User already exists with the same email!");
    }

    //hashing or encrypting the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //save the user in the database
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword, // dont write hashedpassword here...write like password: hashedPassword
    });

    //generate a token for user and send it to the backend

    /*we will generate a token using JWT which has header,payload and signature in it
  header contains info about how jwt is encoded and which algo we want to use 
  payload is what the user will be sending(your information)
  signature checks that it has not been tampered*/
    // npm i jsonwebtoken

    const token = jwt.sign({ id: user._id, email }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    user.token = token;
    user.password = undefined;
    res
      .status(200)
      .json({ message: "You have successfully registered!", user });
  } catch (error) {
    console.log(error1);
  }
});

//LOGIN Functionality

app.post("/login", async (req, res) => {
  try {
    // get data from user
    const { email, password } = req.body;

    //check if all the fields have been filled by the user or not
    if (!(email && password)) {
      return res.status(400).send("Please enter all the information");
    }

    //add more verifications
    if (!validateEmail(email)) {
      return res.status(400).send("Invalid email format");
    }

    //find the user in the database
    const user = await User.findOne({ email }); //database calling so we need await
    if (!user) {
      return res.status(404).send("User not found!");
    }

    //check the password
    const enteredPassword = await bcrypt.compare(password, user.password);
    if (!enteredPassword) {
      return res.status(404).send("Password is incorrect");
    }

    //generate a token for user and send it to the backend
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });
    user.token = token;
    user.password = undefined;

    //now we have to store this token
    //cookies is the best way to store token and not local storage and session storage
    //so store token in cookies with options
    const options = {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), //cookies expires in this time
      httpOnly: true, //cookie can only be manipulated by server not by client/user
    };

    //send the token
    res.status(200).cookie("token", token, options).json({
      message: "You have successfully logged in!",
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
  }
});

// Get all problems
app.get("/problems", async (req, res) => {
  try {
    const problems = await Problem.find();
    res.json(problems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single problem by ID
app.get("/problems/:id", async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ message: "Problem not found" });
    res.json(problem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new problem
app.post("/problems", async (req, res) => {
  const problem = new Problem({
    title: req.body.title,
    difficulty: req.body.difficulty,
    statement: req.body.statement,
    sampleInput1: req.body.sampleInput1,
    sampleOutput1: req.body.sampleOutput1,
    sampleInput2: req.body.sampleInput2,
    sampleOutput2: req.body.sampleOutput2,
  });

  try {
    const newProblem = await problem.save();
    res.status(201).json(newProblem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an existing problem
app.patch("/problems/:id", async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ message: "Problem not found" });

    if (req.body.title != null) problem.title = req.body.title;
    if (req.body.difficulty != null) problem.difficulty = req.body.difficulty;
    if (req.body.statement != null) problem.statement = req.body.statement;
    if (req.body.sampleInput1 != null)
      problem.sampleInput1 = req.body.sampleInput1;
    if (req.body.sampleOutput1 != null)
      problem.sampleOutput1 = req.body.sampleOutput1;
    if (req.body.sampleInput2 != null)
      problem.sampleInput2 = req.body.sampleInput2;
    if (req.body.sampleOutput2 != null)
      problem.sampleOutput2 = req.body.sampleOutput2;

    const updatedProblem = await problem.save();
    res.json(updatedProblem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a problem
app.delete("/problems/:id", async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ message: "Problem not found" });

    await Problem.deleteOne({ _id: req.params.id });
    res.json({ message: "Problem deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// RUN a code(COMPILE functionality)
app.post("/run", async (req, res) => {
  // const language = req.body.language;
  // const code = req.body.code;

  const { language = "cpp", code, input } = req.body;
  if (code === undefined) {
    return res.status(500).json({ success: false, error: "Empty code!" });
  }
  try {
    const filePath = await generateFile(language, code);
    const inputPath = await generateInputFile(input);
    const output = await executeCpp(filePath, inputPath); //this executeCpp function will only cpp files..we can use switch case and create more functions so that codes in different languages can be executes
    res.json({ filePath, inputPath, output });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

//Submit a code
app.post("/submit", async (req, res) => {
  const { code, problemId } = req.body;

  if (!code) {
    return res.status(400).json({ success: false, error: "Empty code!" });
  }

  try {
    const problem = await Problem.findById(problemId);
    if (!problem) {
      return res
        .status(404)
        .json({ success: false, error: "Problem not found!" });
    }

    const { sampleInput1, sampleInput2, sampleOutput1, sampleOutput2 } =
      problem;
    const testCases = [
      { input: sampleInput1, expectedOutput: sampleOutput1 },
      { input: sampleInput2, expectedOutput: sampleOutput2 },
    ];

    const testResults = await Promise.all(
      testCases.map(async (testCase, index) => {
        const { input, expectedOutput } = testCase;

        try {
          const inputPath = await generateInputFile(input);
          const filePath = await generateFile("cpp", code);
          const actualOutput = await executeCpp(filePath, inputPath);

          const isCorrect = actualOutput.trim() === expectedOutput.trim();
          const verdict = isCorrect ? "Correct" : "Incorrect";

          return {
            input,
            expectedOutput,
            actualOutput,
            verdict,
          };
        } catch (testError) {
          return {
            input,
            expectedOutput,
            actualOutput: "Error",
            verdict: "Error",
          };
        }
      })
    );

    const overallStatus = testResults.every(
      (result) => result.verdict === "Correct"
    )
      ? "Correct"
      : "Incorrect";

    // Construct submission for each test case result
    const submissionData = testResults.map((result) => ({
      code,
      problemId,
      input: result.input,
      expectedOutput: result.expectedOutput,
      output: result.actualOutput,
      status: result.verdict,
    }));

    // Save all submissions
    const newSubmissions = await Submission.insertMany(submissionData);

    res.json({
      success: true,
      submissions: newSubmissions,
    });
  } catch (error) {
    console.error("Error during submission:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}!`);
});
