const express = require("express");
const { createTodo, id } = require("./types");
const { TodoModel } = require("./db");
const app = express();

const todos = [];

app.use(express.json());

app.get("/todos/all", async (req, res) => {
  try {
    const allTodos = await TodoModel.find();
    res.json(allTodos);
  } catch (err) {
    res.status(404).send({ error: err.message });
  }
});

app.post("/todos/", async (req, res) => {
  const createPayload = req.body;
  const parsedpayload = createTodo.safeParse(createPayload);

  if (!parsedpayload.success) {
    res.status(404).send({ message: "You have sent an invalid input." });
  } else {
    const { title, description } = req.body;
    const todo = new TodoModel({
      title: title,
      description: description,
      completed: false,
    });

    try {
      await todo.save();
      res.send({ message: "Success!", todo: todo });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  }
});

app.put("/todos/completed/", async (req, res) => {
  const updatePayload = req.body;
  const parsedpayload = id.safeParse(updatePayload);

  if (!parsedpayload.success) {
    res.status(411).send({ message: "You have sent an invalid" });
  }

  try {
    await TodoModel.update(
      {
        _id: req.params.id,
      },
      {
        completed: true,
      }
    );
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server listening is running on port 3000");
});
