const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

// Configure sua conexão MySQL
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'NovaSenhaSegura123',
  database: 'vivere_estoque'
});

// Rota para o front-end buscar dados
app.get('/api/dados', (req, res) => {
  db.query('SELECT * FROM inventario', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

app.listen(3001, () => {
  console.log('API rodando em http://localhost:3001');
});


// Inicie o servidor
app.listen(3001, () => {
  console.log('API rodando em http://localhost:3001');
});
