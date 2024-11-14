const PORT = 8000;

async function handler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const path = url.pathname;

  if (req.method === "GET" && path === "/") {
    return new Response("Hello World!");
  } else if (req.method === "POST" && path === "/api/todos") {
    // handle POST /api/todos
  } else if (req.method === "GET" && path === "/api/todos") {
    //Handle GET /api/todos
  } else if (req.method === "GET" && path === "/api/todos/incomplete/count") {
    //Handle GET /api/todos/incomplete/count
  } else if (req.method === "GET" && path.startsWith("/api/todos/")) {
    //Handle GET /api/todos/:id
  } else if (req.method === "PUT" && path.startsWith("/api/todos/")) {
    //Handle PUT /api/todos/:id
  } else if (req.method === "DELETE" && path.startsWith("/api/todos/")) {
    //Handle DELETE /api/todos/:id
  }

  return new Response("Not Found", { status: 404 });
}

console.log(`Server running on http://localhost:${PORT}`);
Deno.serve({ port: PORT, handler });
