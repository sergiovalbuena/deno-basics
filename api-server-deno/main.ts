import { Hono } from "@hono/hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello, trees!");
});

interface Tree {
  id: string;
  name: string;
  age: number;
  location: string;
}

const oak: Tree = {
  id: "1",
  name: "Oak",
  age: 100,
  location: "Europe",
};

//helpers
const setItem = (key: string, value: Tree) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getItem = (key: string): Tree | null => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

setItem(`trees_${oak.id}`, oak);
const newTree = getItem(`trees_${oak.id}`);
console.log(newTree);

Deno.serve(app.fetch);
