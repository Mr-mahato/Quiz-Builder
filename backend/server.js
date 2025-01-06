const express = require("express");
const connectDB = require("./config/DbConn");
const Comprehension = require("./model/comprehensionModel");
const Category = require("./model/CategoriesModel");
const FillInTheBlanks = require("./model/FillInTheBlanks"); // Import the FillInTheBlanks model
require("dotenv").config();
const app = express();
const port = 3000;

// Connect to the database
connectDB();

// Middleware to parse JSON
app.use(express.json());

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

// Route to create a new category document
app.post("/category", async (req, res) => {
  try {
    const { categories } = req.body;
    console.log(categories);
    const category = new Category({ categories });
    await category.save();
    console.log(category);
    res.status(201).json("Category received successfully");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to create a new fill-in-the-blank question
app.post("/fill-in-the-blanks-question", async (req, res) => {
  try {
    const { originalText, blankText, answers } = req.body;
    const fillInTheBlanks = new FillInTheBlanks({
      originalText,
      blankText,
      answers,
    });
    await fillInTheBlanks.save();
    res.status(201).json(fillInTheBlanks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/fill-in-the-blanks-questions-answer", async (req, res) => {
  try {
    const fillInTheBlanksQuestions = await FillInTheBlanks.find();
    res.status(200).json(fillInTheBlanksQuestions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/categories", async (req, res) => {
  try {
    const category = await Category.find();
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
