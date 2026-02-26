import { Request, Response } from "express";
import { getTodos as fetchTodos, addTodo, deleteTodo } from "../data/seed";

// Render ToDo page
export function showTodos(req: Request, res: Response) {
  res.render("list", {
    listTitle: "Today",
    items: fetchTodos(),
    username: req.session.username,
  });
}

// Add item
export function addItem(req: Request, res: Response) {
  const name = (req.body.newItem ?? "").toString().trim();
  if (name) addTodo(name);

  res.redirect("/todos");
}

// Delete item
export function deleteItem(req: Request, res: Response) {
  const id = Number(req.body.checkbox);
  if (!Number.isNaN(id)) deleteTodo(id);

  res.redirect("/todos");
}