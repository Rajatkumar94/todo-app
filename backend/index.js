const express = require("express");
const { createTodo, todoIdSchema } = require("./types");
const { TodoModel } = require("./db");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

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
      res.send({ todo });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  }
});

app.put("/todos/update/:id", async function (req, res) {
  const id = req.params.id;
  const { title, description } = req.body;

  try {
    const todoUpdate = await TodoModel.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    res.send(todoUpdate);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put("/todos/completed/:id", async (req, res) => {
  const id = req.params.id;

  try {
    // Find the todo by ID
    const todo = await TodoModel.findById(id);

    if (!todo) {
      return res.status(404).send({ message: "Todo not found" });
    }

    // Toggle the completed status
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      id,
      { completed: !todo.completed }, // Toggle the completed status
      { new: true }
    );

    res.status(200).send(updatedTodo);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

app.delete("/todos/delete/:id", async (req, res) => {
  const todoId = req.params.id;
  try {
    const deletedTodo = await TodoModel.findByIdAndDelete(todoId);

    console.log(deletedTodo);
    if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json({ deletedTodo });
  } catch (error) {
    res.status(500).json({ message: "Error deleting", error });
  }
});

app.listen(3000, () => {
  console.log("Server listening is running on port 3000");
});
