const request = require('supertest');
const { app, server } = require('./server'); 

let registroId;

afterAll(() => {
  server.close(done);
});

describe('Testes da API - CI e CD', () => {
  test('POST /api/recurso - Criar um novo registro', async () => {
    const response = await request(app)
      .post('/api/recurso')
      .send({ titulo: 'Novo Registro', status: 'ativo' });
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    registroId = response.body.id; 
  });

  test('GET /api/recurso - Listar todos os registros', async () => {
    const response = await request(app).get('/api/recurso');
    
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /api/recurso/:id - Buscar um registro específico pelo ID', async () => {
    const response = await request(app).get(`/api/recurso/${registroId}`);
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', registroId);
  });

  test('PUT /api/recurso/:id - Atualizar um registro existente', async () => {
    const response = await request(app)
      .put(`/api/recurso/${registroId}`)
      .send({ titulo: 'Registro Atualizado', status: 'inativo' });
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('titulo', 'Registro Atualizado');
  });

  test('DELETE /api/recurso/:id - Deletar um registro existente', async () => {
    const response = await request(app).delete(`/api/recurso/${registroId}`);
    
    expect(response.status).toBe(204);
  });
});