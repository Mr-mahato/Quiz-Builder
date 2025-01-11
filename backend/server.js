const express = require("express");
const connectDB = require("./config/DbConn");
const Comprehension = require("./model/comprehensionModel");
require("dotenv").config();
const cors = require('cors');
const quizRouter = require('./Routes/quizFormRoutes')
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
// Connect to the database
connectDB();

// Middleware to parse JSON
app.use(express.json());
app.use('/api/v1',quizRouter);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});


// Route to create a new comprehension document
app.post("/comprehensions", async (req, res) => {
  try {
    const { passage, questions } = req.body;
    const comprehension = new Comprehension({ passage, questions });
    await comprehension.save();
    res.status(201).json(comprehension);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
