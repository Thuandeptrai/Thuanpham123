import request from 'supertest';

import server from '../src/server';

describe('API Products Endpoints', () => {
  it('should return listing with records', async () => {
    const res = await request(server).get('/api/products?page=5&size=4');
    expect(res.status).toEqual(200);
    // FIXME
  });

  it('should return listing with no records', async () => {
    const res = await request(server).get('/api/products?page=50');
    expect(res.status).toEqual(200);
    // FIXME
  });

  it('should create new product', async () => {
    const res = await request(server).post('/api/products')
      .send({
        code: 'P101',
        name: 'Tall Basket',
        category: 'Home Decoration',
        brand: null,
        type: null,
        description: 'The next super product of the year.',
      });
    expect(res.status).toEqual(200);
    // FIXME
  });

  it('should update existing product', async () => {
    const res = await request(server).put('/api/products/P003')
      .send({
        description: '*NULL*',
      });
    expect(res.status).toEqual(200);
    // FIXME
  });

  it('should delete existing product', async () => {
    const res = await request(server).delete('/api/products/P005');
    expect(res.status).toEqual(200);
    // FIXME
  });
});
