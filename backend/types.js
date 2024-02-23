const { string, object } = require("zod");

const createTodo = object({
  title: string(),
  description: string(),
});

const id = object({
  id: string(),
});

module.exports = {
  createTodo,
  id,
};
