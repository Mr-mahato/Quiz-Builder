const express = require("express");
const quizRouter = express.Router();
const {
  intro,
  postFillBlanks,
  postCategory,
  getCategory,
  getFillTheGaps,
} = require("../controller/quizController");
quizRouter.get("/", intro);
quizRouter.post("/fill-in-the-blanks-question", postFillBlanks);
quizRouter.post("/create-category-question", postCategory);
quizRouter.get("/getCategory/:quizId", getCategory);
quizRouter.get("/getFillGaps/:quizId", getFillTheGaps);

module.exports = quizRouter;
