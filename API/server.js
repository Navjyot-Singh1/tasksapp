const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB

mongoose
  .connect(
    "mongodb+srv://navjyot1234:abcde12345@cluster0.o6xrbmn.mongodb.net/test",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const Todo = require("./models/Todo");

app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

//Add Todos

app.post("/todo/new", async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    complete: false,
  });
  await todo.save();
  res.json(todo);
});

//Delete Todos
app.delete("/todo/delete/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  await todo.remove();
  res.json(todo);
});

//Update Todos
app.get("/todo/complete/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.complete = !todo.complete;
  await todo.save();
  res.json(todo);
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
