import { Hono } from "@hono/hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello, trees!");
});

Deno.serve(app.fetch);
