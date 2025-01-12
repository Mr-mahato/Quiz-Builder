const FillTheBlankModel = require("../model/FillInTheBlanks");
const CategoryModel = require("../model/CategoriesModel");
const intro = async (req, res) => {
  try {
    res.status(200).json({
      status: 1,
      message: "You server is working fine",
    });
  } catch (error) {
    conosle.log(error);
    res.status(500).json({
      status: 0,
      message: "server issue",
    });
  }
};

const postFillBlanks = async (req, res) => {
  try {
    const { text, blanks,quizId } = req.body;
    const blanksObjData = new FillTheBlankModel({ text, blanks,quizId });
    await blanksObjData.save();

    res.status(201).json({
      status: 1,
      data: blanksObjData,
      messge: "Fill the blanks based question created successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const postCategory = async (req, res) => {
  try {
    const { index, question, categories,quizId } = req.body;

    const categoryObjData = new CategoryModel({ index, question, categories ,quizId});

    await categoryObjData.save();

    res.status(201).json({
      status: 1,
      data: categoryObjData,
      messge: "Category based question created successfully!!",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCategory = async (req, res) => {
  try {
    const { quizId } = req.params;
    const data = await CategoryModel.findOne({ quizId: quizId });

    const category = data.categories.map((val) => {
      return { id: val.category, name: val.category, items: [] };
    });
    const categoryWithData = data.categories.map((val) => {
      return { [val.category]: val.data };
    });
    const onlyData = data.categories.reduce((acc, val) => {
      return [...acc, ...val.data];
    }, []);
    const question = data.question;

    res.status(200).json({
      status: 1,
      category,
      question,
      categoryWithData,
      onlyData,
      message: "Category fetched successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: 0,
      message: error.message,
    });
  }
};

const getFillTheGaps = async (req, res) => {
  try {
    const { quizId } = req.params;

    const data = await FillTheBlankModel.findOne({ quizId: quizId });
    const question = data.text;
    const blanks = data.blanks;
    res.status(200).json({
      status: 1,
      question,
      options:blanks[0].options,
      blanks,
    });
  } catch (error) {
    res.status(400).json({
      status: 0,
      error: error.message,
    });
  }
};

module.exports = {
  intro,
  postFillBlanks,
  postCategory,
  getCategory,
  getFillTheGaps,
};
