require("dotenv").config();
const { connect, Schema, model } = require("mongoose");

connect(process.env.MONGODB_URI);

const todoScheme = Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const TodoModel = model("Todo", todoScheme);

module.exports = {
  TodoModel,
};
