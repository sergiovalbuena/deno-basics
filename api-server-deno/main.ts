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

//create a new tree
app.post("/trees", async (c) => {
  const treeDetails = await c.req.json();
  const tree: Tree = treeDetails;
  setItem(`trees_${tree.id}`, tree);
  return c.json({
    message: `Tree ${tree.name} added successfully`,
  });
});
//test
// curl -X POST https://localhost:8000/trees \
// - H "Content-Type: application/json" \
// -d '{"id": "2", "name": "Pine", "age": 50, "location": "Asia"}'

//get tree id
app.get("/trees/:id", async (c) => {
  const treeId = await c.req.param("id");
  const tree = getItem(`trees_${treeId}`);
  if (!tree) {
    return c.json({
      message: `Tree with id ${treeId} not found`,
    });
  }
});

app.put("/trees/:id", async (c) => {
  const id = c.req.param("id");
  const { name, age, location } = await c.req.json();
  const updatedTree: Tree = { id, name, age, location };
  setItem(`trees_${id}`, updatedTree);
  return c.json({
    message: `Tree ${name} updated successfully`,
  });
});

const deleteItem = (key: string) => {
  localStorage.removeItem(key);
};

app.delete("/trees/:id", async (c) => {
  const id = await c.req.param("id");
  deleteItem(`trees_${id}`);
  return c.json({
    message: `Tree with id ${id} deleted successfully`,
  });
});

Deno.serve(app.fetch);
