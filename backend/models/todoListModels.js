const mongoose = require("mongoose");

const todoListSchema = mongoose.Schema(
  {
    todo: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const todoListModel = mongoose.model("Todos", todoListSchema);

module.exports = todoListModel;
