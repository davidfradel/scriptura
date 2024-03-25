const fastify = require('fastify')({ logger: true, bodyLimit: 52428800 });

const Guardian = require('guardian/dist/index').default;
const connectDB = require('../config/db');

const bookRoutes = require('./routes/bookRoutes');
const process = require('process');

// Establish the connection to the database
connectDB().then(() => {
  console.log('Connected to MongoDB');
  const guardian = new Guardian(); // Assume that Guardian uses the global mongoose instance

  // Register the routes by passing the Guardian instance
  fastify.register(bookRoutes, { guardian });

  // Start the server
  fastify.listen(3000, '0.0.0.0', err => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    console.log(`Server running on port ${fastify.server.address().port}`);
  });
}).catch(err => console.error('Database connection failed', err));