const request = require('supertest')
const app = require('../index');


describe('Post Endpoints', () => {
  it('should get the category catalog', async () => {
    const res = await request(app)
      .get('/api/v1/category')
      .send();
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('count')
  })
})