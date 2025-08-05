const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

const postRoutes = require('./routes/posts');

const app = express();
const PORT = process.env.PORT || 4000;

// Connexion MongoDB via config/db.js
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/posts', postRoutes);

// Route de test
app.get('/', (req, res) => {
  res.json({ message: 'API Blog Recettes - Prêt ! 🍳' });
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
