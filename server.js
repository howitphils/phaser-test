const http = require("http");
const path = require("path");
const fs = require("fs");

// Define MIME types for different file extensions
const mimeTypes = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
};

const server = http.createServer();
const PORT = process.env.PORT || 3000;

server.on("request", (req, res) => {
  // Get file path
  let filePath =
    req.url === "/" // If the URL is "/", serve index.html from the public folder
      ? path.join(__dirname, "public", "index.html")
      : path.join(__dirname, req.url); // Otherwise, serve the requested file via the URL (e.g. /assets/image.png)

  // Get file extension
  const extname = path.extname(filePath); // e.g. .html, .js, .css, .png, .jpg, .gif
  const contentType = mimeTypes[extname] || "application/octet-stream";

  // Create read stream
  const stream = fs.createReadStream(filePath);

  // Handle errors
  stream.on("error", (error) => {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 Not Found</h1>");
  });

  // Serve the file
  res.writeHead(200, { "Content-Type": contentType });
  stream.pipe(res);
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${port}`);
});
