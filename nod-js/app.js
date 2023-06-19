const express = require('express');
const { Pool } = require('pg');

const cors = require('cors');

// Utilisez le middleware cors

const app = express();
app.use(cors());

const port = 3000;

// Configuration de la connexion à la base de données PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'customers',
  password: 'postgres',
  port: 5432, // Le port par défaut de PostgreSQL est 5432
});

// Middleware pour parser le corps des requêtes en tant que JSON
app.use(express.json());

// Route POST pour insérer des données dans la base de données
app.post('/api/data', (req, res) => {
  const { name, email } = req.body; // Supposons que votre requête POST envoie des données avec des clés "name" et "age"

  // Requête SQL pour insérer les données dans la table appropriée
  const query = 'INSERT INTO customers (name, email) VALUES ($1, $2)';

  // Paramètres des valeurs à insérer dans la requête
  const values = [name, email];

  // Exécution de la requête PostgreSQL
  pool.query(query, values, (error, result) => {
    if (error) {
      console.error('Erreur lors de l\'insertion des données :', error);
      res.status(500).send('Erreur lors de l\'insertion des données');
    } else {
      console.log('Données insérées avec succès');
      res.status(200).send('Données insérées avec succès');
    }
  });
});

// Démarrage du serveur


app.get('/api/customers', (req, res) => {
  const sql = 'SELECT * FROM  customers'; 
  pool.query(sql, (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Erreur lors de la récupération des postgres.' });
    } else {
      res.status(200).json({ success: true, data: results.rows});
    }
  });
});

app.listen(3000, () => {
  console.log('Serveur API démarré sur le port 3000');
});


