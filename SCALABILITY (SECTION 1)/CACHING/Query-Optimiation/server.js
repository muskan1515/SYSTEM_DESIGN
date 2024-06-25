/*
    Content Deliver Networks
*/
const redis = require('redis');
const client = redis.createClient();

function getUserById(userId, callback) {
  const cacheKey = `user_${userId}`;

  // Check if user data exists in cache
  client.get(cacheKey, (err, cachedUser) => {
    if (err) throw err;

    if (cachedUser) {
      console.log('Cache hit for user', userId);
      callback(JSON.parse(cachedUser));
    } else {
      console.log('Cache miss for user', userId);
      // If not cached, fetch from database
      db.query('SELECT * FROM users WHERE id = ?', [userId], (err, results) => {
        if (err) throw err;
        
        const user = results[0];
        // Cache the user data for future requests
        client.setex(cacheKey, 3600, JSON.stringify(user)); // Cache for 1 hour

        callback(user);
      });
    }
  });
}

// In this the query for fetching the selected userid is being first checked
// inside the cache client check for the specific userId then subsequently is 
// not found then return through db call else from cache

