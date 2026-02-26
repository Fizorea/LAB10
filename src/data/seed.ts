import fs from "fs";
import path from "path";

export type User = { id: number; username: string; password: string };
export type TodoItem = { id: number; name: string };

export const seedUsers: User[] = [
  { id: 1, username: "user1", password: "password1" },
  { id: 2, username: "user2", password: "password2" },
];

const dataPath = path.join(process.cwd(), "src/data/todos.json");

function readTodos(): TodoItem[] {
  const raw = fs.readFileSync(dataPath, "utf-8");
  return JSON.parse(raw);
}

function writeTodos(todos: TodoItem[]) {
  fs.writeFileSync(dataPath, JSON.stringify(todos, null, 2));
}

export function getTodos(): TodoItem[] {
  return readTodos();
}

export function addTodo(name: string) {
  const todos = readTodos();
  const maxId = todos.reduce((m, it) => Math.max(m, it.id), 0);
  todos.push({ id: maxId + 1, name });
  writeTodos(todos);
}

export function deleteTodo(id: number) {
  const todos = readTodos().filter((it) => it.id !== id);
  writeTodos(todos);
}