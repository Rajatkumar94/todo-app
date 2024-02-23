const { connect, Schema, model } = require("mongoose");

connect(
  ""
);

const todoScheme = Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const TodoModel = model("Todo", todoScheme);

module.exports = {
  TodoModel,
};
