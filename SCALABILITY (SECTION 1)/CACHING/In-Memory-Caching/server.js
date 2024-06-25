/*
    IN MEMORY CACHING TECHNIQUE
*/


const express = require('express');
const app = express();
const port = 3000;

// In-memory cache object
const cache = {};
const CACHE_DURATION = 1000; // Cache duration in milliseconds (1 second)


// Middleware to handle caching with expiration
const cacheMiddleware = async (req, res, next) => {
  const key = req.params.key;
  const cachedEntry = cache[key];

  if (cachedEntry) {
    const now = Date.now();
    const isExpired = now - cachedEntry.timestamp > CACHE_DURATION;

    if (!isExpired) {
      console.log(`Cache hit for ${key}`);
      return res.send(cachedEntry.data);
    } else {
      console.log(`Cache expired for ${key}`);
      delete cache[key]; // Remove expired entry from cache
    }
  } else {
    console.log(`Cache miss for ${key}`);
  }

  next();
};

app.get('/data/:key', cacheMiddleware, async (req, res) => {
  const key = req.params.key;
 /*Here perform the database queries for fetching the data */
 //get data from here
  cache[key] = { data: data, timestamp: Date.now() }; // Store data and timestamp in cache
  res.send(data);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


//In this the key is the unique field or id to be used for finding and storing 
// the data for fast access
// Also added expiry of max 1 seconds hence making it finely work to dynamically
//changing data

//example :  http://localhost:3000/data/currentUsers
//           As first time its wont have data stored so its either call from db or 
// then for second call it would access the same data from cache stored if fetched 
// within 1 second timestamp