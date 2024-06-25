/*
    DISTRIBUTED CACHING TECHNIQUE USING REDIS CLIENT
*/

const express = require('express');
const redis = require('redis');
const app = express();
const port = 3000;

// Create a Redis client
const redisClient = redis.createClient();

redisClient.on('error', (err) => {
  console.log('Redis error: ', err);
});

// Middleware to handle caching with Redis
const cacheMiddleware = async (req, res, next) => {
  const key = req.params.key;

  redisClient.get(key, (err, data) => {
    if (err) {
      console.error('Redis get error:', err);
      return res.status(500).send('Server Error');
    }

    if (data) {
      console.log(`Cache hit for ${key}`);
      return res.send(data);
    } else {
      console.log(`Cache miss for ${key}`);
      next();
    }
  });
};

app.get('/data/:key', cacheMiddleware, async (req, res) => {
  const key = req.params.key;
    
  /*Here perform the database queries for fetching the data */

  // Store data in Redis cache with an expiration time
  redisClient.setex(key, 10, data); // Cache expires in 10 seconds

  res.send(data);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
