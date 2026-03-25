import { createServer } from "http";
import { readFile } from "fs/promises";
import { extname, join, resolve } from "path";

const root = resolve(process.cwd());
const port = 5173;

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8"
};

function sendFile(response, filePath) {
  readFile(filePath)
    .then((data) => {
      response.writeHead(200, {
        "Content-Type": contentTypes[extname(filePath)] ?? "application/octet-stream"
      });
      response.end(data);
    })
    .catch(() => {
      response.writeHead(404);
      response.end("Not found");
    });
}

createServer((request, response) => {
  const urlPath = request.url === "/" ? "/index.html" : request.url ?? "/index.html";
  const filePath = join(root, urlPath);
  sendFile(response, filePath);
}).listen(port, () => {
  console.log(`Frontend running on http://localhost:${port}`);
});

