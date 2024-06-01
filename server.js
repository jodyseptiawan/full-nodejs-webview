const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");

const app = express();
const port = 3000;

const hbs = exphbs.create({
  helpers: {
    increment: (value) => {
      return value + 1;
    },
    isEqual: (value1, value2, options) => {
      const isEqual =
        value1 === value2 ? options.fn(this) : options.inverse(this);

      return isEqual;
    },
  },
});

app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.static(path.join(__dirname, "public")));

const itemObj = {
  id: Date.now(),
  title: "Todo",
  note: "Todo Desc",
  status: "Doing",
};

let todos = [itemObj];

app.get("/", (req, res) => {
  const data = {
    title: "Todo App",
    todos: todos,
  };

  res.render("home", data);
});

app.get("/create", (req, res) => {
  const data = {
    title: "Create | Todo App",
  };

  res.render("create", data);
});

app.post("/todos", (req, res) => {
  const title = req.body.title;
  const note = req.body.note;

  const tmpTodo = { id: Date.now(), title, note, status: "Todo" };

  todos.push(tmpTodo);

  res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
  const id = req.params.id;

  todos = todos.filter((item) => item.id != id);

  res.redirect("/");
});

app.get("/update/:id", (req, res) => {
  const id = req.params.id;

  const todo = todos.find((item) => item.id == id);
  if (!todo) {
    res.redirect("/");
  }

  const data = {
    title: "Update | Todo App",
    todo: todo,
  };

  res.render("update", data);
});

app.post("/todos/update/:id", (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const note = req.body.note;
  const status = req.body.status;

  todos = todos.map((item) => {
    if (item.id == id) {
      item.title = title;
      item.note = note;
      item.status = status;

      return item;
    } else {
      return item;
    }
  });

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
