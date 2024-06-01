const express = require("express");

const hbs = require("./libs/handlebars");
const db = require("./libs/postgresql");
const getCurrentTimestamp = require("./helpers/getTimestamp");

const path = require("path");

const app = express();
const port = 3000;

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

app.get("/", async (req, res) => {
  const query = `SELECT *
  FROM public."Todos" ORDER BY "createdAt" ASC;`;
  const result = await db.query(query);

  const data = {
    title: "Todo App",
    todos: result.rows,
  };

  res.render("home", data);
});

app.get("/create", (req, res) => {
  const data = {
    title: "Create | Todo App",
  };

  res.render("create", data);
});

app.post("/todos", async (req, res) => {
  const title = req.body.title;
  const note = req.body.note;

  const query = `INSERT INTO public."Todos"
                (title, note, status, "createdAt")
                VALUES (  '${title}', '${note}', 'Todo', '${getCurrentTimestamp()}');`;
  await db.query(query);

  res.redirect("/");
});

app.get("/delete/:id", async (req, res) => {
  const id = req.params.id;

  const query = `DELETE FROM public."Todos"
                    WHERE id=${id};`;
  await db.query(query);

  res.redirect("/");
});

app.get("/update/:id", async (req, res) => {
  const id = req.params.id;

  const query = `SELECT * FROM public."Todos" WHERE id=${id};`;
  const result = await db.query(query);

  const todo = result.rows[0];
  if (!todo) {
    res.redirect("/");
  }

  const data = {
    title: "Update | Todo App",
    todo: todo,
  };

  res.render("update", data);
});

app.post("/todos/update/:id", async (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const note = req.body.note;
  const status = req.body.status;

  const query = `UPDATE public."Todos"
                    SET  title='${title}', note='${note}', status='${status}'
                    WHERE id=${id};`;
  await db.query(query);

  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
