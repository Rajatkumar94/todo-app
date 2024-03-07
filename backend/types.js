const { string, object } = require("zod");

const createTodo = object({
  title: string(),
  description: string(),
});

const todoIdSchema = object({
  id: string(),
});

module.exports = {
  createTodo,
  todoIdSchema,
};
