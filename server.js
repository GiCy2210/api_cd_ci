const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let registros = [];

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const swaggerDocument = YAML.load('./api.yml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.post('/api/recurso', (req, res) => {
  const { titulo, status } = req.body;
  
  if (!titulo) {
    return res.status(400).json({ erro: 'O campo título é obrigatório.' });
  }

  const novoRegistro = { id: Date.now(), titulo, status };
  registros.push(novoRegistro);
  
  res.status(201).json(novoRegistro);
});

app.get('/api/recurso', (req, res) => {
  res.status(200).json(registros);
});

app.get('/api/recurso/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const registro = registros.find(r => r.id === id);

  if (!registro) {
    return res.status(404).json({ erro: 'Registro não encontrado' });
  }
  
  res.status(200).json(registro);
});

app.put('/api/recurso/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = registros.findIndex(r => r.id === id);

  if (index === -1) {
    return res.status(404).json({ erro: 'Registro não encontrado' });
  }

  registros[index] = { ...registros[index], ...req.body, id };
  res.status(200).json(registros[index]);
});

app.delete('/api/recurso/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = registros.findIndex(r => r.id === id);
  
  if (index === -1) {
    return res.status(404).json({ erro: 'Registro não encontrado' });
  }

  registros.splice(index, 1);
  res.status(204).send(); 
});

const server = app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = { app, server };