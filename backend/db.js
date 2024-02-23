const { connect, Schema, model } = require("mongoose");

connect(
  "mongodb+srv://admin-second:hKAOQmInAhr7qZ0E@cluster0.qzvh3ot.mongodb.net/todos-app"
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
