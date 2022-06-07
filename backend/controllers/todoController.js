const asyncHandler = require("express-async-handler");

const Todo = require("../models/todoListModels");

// @description     Get todos
// @route           GET /api/todos/
// @access          Private
const getTodo = asyncHandler(async (req, res) => {
  const todos = await Todo.find();

  res.status(200).json(todos);
});

// @description     Create todos
// @route           POST /api/todos/
// @access          Private
const createTodo = asyncHandler(async (req, res) => {
  if (!req.body.todo) {
    res.status(400);
    throw new Error("Please add a todo!");
  }

  const todo = await Todo.create({
    todo: req.body.todo,
  });

  res.status(200).json(todo);
});

// @description     Update todos
// @route           PUT /api/todos/:id
// @access          Private
const updateTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(400);
    throw new Error("Todo not found!");
  }

  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({ id: req.params.id, updatedTodo: req.body });
});

// @description     Delete todos
// @route           DELETE /api/todos/:id
// @access          Private
const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(400);
    throw new Error("Todo not found!");
  }

  const deletedTodo = await todo.remove();

  res.status(200).json({ id: req.params.id, todoCompleted: todo });
});

module.exports = {
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
