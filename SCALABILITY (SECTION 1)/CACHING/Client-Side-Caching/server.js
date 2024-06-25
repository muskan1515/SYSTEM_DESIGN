/*
CLIENT SIDE CACHING
*/

const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

// Middleware to set caching headers for static files
app.use(
  "/static",
  express.static(path.join(__dirname, "static"), {
    setHeaders: (res, path) => {
      // Set Cache-Control header
      res.setHeader("Cache-Control", "public, max-age=31536000"); // Cache for 1 year

      // Optionally, set ETag
      // ETag will be automatically set by express.static by default
    },
  })
);

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="/static/styles.css">
      </head>
      <body>
        <h1>Hello, Client-Side Caching!</h1>
        <img src="/static/image.png" alt="Example Image">
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


// Cache-Control Header
// The Cache-Control header is used by the server to specify caching policies in 
// both requests and responses. It has several directives that control how caching 
// should be applied. Here are some common directives:

// public: Indicates that the response may be cached by any cache, even if it's normally private.
// private: Indicates that the response is intended for a single user and should not be cached by shared caches.
// max-age=<seconds>: Specifies the maximum amount of time (in seconds) that 
// a cached resource can be considered fresh. For example, max-age=3600 means the 
// resource is valid for 1 hour.
// s-maxage=<seconds>: Similar to max-age, but applies only to shared caches (e.g., CDN caches).
// no-store: Directs caches not to store any version of the response.

//Example : Cache-Control: public, max-age=31536000


