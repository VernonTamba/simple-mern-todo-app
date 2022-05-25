const asyncHandler = require("express-async-handler");

// @description     Get todos
// @route           GET /api/todos/
// @access          Private
const getTodo = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Get todo list",
  });
});

// @description     Create todos
// @route           POST /api/todos/
// @access          Private
const createTodo = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a todo!");
  }

  res.status(200).json({
    message: "Create todo list",
  });
});

// @description     Update todos
// @route           PUT /api/todos/:id
// @access          Private
const updateTodo = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Update todo list",
  });
});

// @description     Delete todos
// @route           DELETE /api/todos/:id
// @access          Private
const deleteTodo = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Delete todo list",
  });
});

module.exports = {
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
