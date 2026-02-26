import express from "express";
import session from "express-session";
import path from "path";
import { requireLogin } from "./middleware/requireLogin";

import { showLogin, login, logout } from "./controllers/authController";
import { showTodos, addItem, deleteItem } from "./controllers/todoController";

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(process.cwd(), "public")));

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "views"));

app.use(
  session({
    secret: "replace-with-a-strong-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    },
  })
);

app.get("/", showLogin);
app.post("/login", login);

app.get("/todos", requireLogin, showTodos);
app.post("/add", requireLogin, addItem);
app.post("/delete", requireLogin, deleteItem);

app.post("/logout", requireLogin, logout);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});