const request = require('supertest');
const { app, server } = require('../server');

afterAll((done) => {
  server.close(done);
});

describe('Testes da API de Recursos', () => {
  it('GET /api/recurso deve retornar status 200 e uma lista', async () => {
    const res = await request(app).get('/api/recurso');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/recurso deve criar um novo registro', async () => {
    const res = await request(app)
      .post('/api/recurso')
      .send({ titulo: 'Teste CI', status: 'ativo' });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.titulo).toBe('Teste CI');
  });
});