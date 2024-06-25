/*
    Content Deliver Networks
*/

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the CloudFront CDN
const CDN_URL = 'https://dXXXXXXXXXXXX.cloudfront.net'; // Replace with your CloudFront domain

app.use('/static', (req, res, next) => {
  const filePath = path.join(__dirname, 'static', req.path);
  res.redirect(`${CDN_URL}/static/${req.path}`);
});

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="/static/styles.css">
      </head>
      <body>
        <h1>Hello, CDN!</h1>
        <img src="/static/image.png" alt="Example Image">
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
