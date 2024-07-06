const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.all("/", (req, res) => {
  console.log("Request Hereeeeeeeeeee", req);
  console.log("Response Hereeeeeeeeeee", res);

  res.send("Hello from server !!");
});
const todos = [
  { id: 1, name: "Task1" },
  { id: 2, name: "Task2" },
];
app.get("/todos", (req, res) => {
  res.send(todos);
});
app.post("/todos", (req, res) => {
  const data = req.body;
  todos.push(data);
  res.json({ status: "Data Pushed!! ", todos });
});
app.put("/todos/:id", (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.send("Enter Name");
    return;
  }
  const { id } = req.params;
  todos[id - 1].name = name;
  res.json({ status: "Updated", todos });
});

app.delete("/todos/:id", (req, res) => {
  const id = req.params;
  const index = todos.findIndex((e) => e.id == id);
  todos.splice(index, 1);
  res.json({ message: "Deleted", todos });
});

app.listen(3000, () => {
  console.log("Server RUnning at port 3000");
});
