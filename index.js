const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const authRouter = require('./routes/auth');
const recipesRouter = require('./routes/recipes');

// Mount the auth and recipes routers
app.use('/api/auth', authRouter); // For login and registration
app.use('/api/recipes', recipesRouter); // For recipes, protected routes

// Root route
app.get('/', (req, res) => {
  res.send('API is running.');
});

// Define the port number
const PORT = process.env.PORT || 5001;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`); // Corrected template literal syntax
});
