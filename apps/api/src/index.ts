import { createServer } from "node:http";

// Punto de partida de la API: un endpoint de salud para comprobar que el
// servidor responde. En la fase 1 lo reemplazaremos por Apollo Server (GraphQL).
const PORT = Number(process.env.PORT ?? 4000);

const server = createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok" }));
    return;
  }
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});
