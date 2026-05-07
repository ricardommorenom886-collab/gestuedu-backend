const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "frontend");

const tipos = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml"
};

const server = http.createServer((req, res) => {
  let url = decodeURIComponent(req.url.split("?")[0]);
  let archivo = path.join(root, url === "/" ? "index.html" : url);

  if (!archivo.startsWith(root)) {
    res.writeHead(403);
    res.end("No permitido");
    return;
  }

  fs.stat(archivo, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404);
      res.end("Archivo no encontrado");
      return;
    }

    const extension = path.extname(archivo).toLowerCase();
    res.writeHead(200, {
      "Content-Type": tipos[extension] || "application/octet-stream"
    });

    fs.createReadStream(archivo).pipe(res);
  });
});

server.listen(5500, () => {
  console.log("Frontend en http://localhost:5500");
});
