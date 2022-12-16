const request = require('supertest')
const app = require('../src')

describe('Add to stack', () => {
  describe('send valid params', () => {
    it('Should return success message with text', async () => {
      const res = await request(app)
      .post('/api/stack')
      .send({
        value: 'text'
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toBe('Value text added to stack');
    })

    it('Should return success message with 123', async () => {
      const res = await request(app)
      .post('/api/stack')
      .send({
        value: 123
      });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toBe('Value 123 added to stack');
    })
  })

  describe('send invalid params', () => {
    it('Should return a error', async () => {
      const res = await request(app)
      .post('/api/stack')
      .send();

      expect(res.statusCode).toEqual(500);
      expect(res.body).toBe('Value can be empty');
    })

    it('Should return a error', async () => {
      const res = await request(app)
      .post('/api/stack')
      .send({ value: ''});

      expect(res.statusCode).toEqual(500);
      expect(res.body).toBe('Value can be empty');
    })

    it('Should return a error', async () => {
      const res = await request(app)
      .post('/api/stack')
      .send({ value: ''});

      expect(res.statusCode).toEqual(500);
      expect(res.body).toBe('Value can be empty');
    })
  })
})

describe('Get from stack', () => {
  it('Should return 123', async () => {
    const res = await request(app)
      .get('/api/stack');

      expect(res.statusCode).toEqual(200);
      expect(res.body.value).toBe(123);
  })

  it('Should return 123', async () => {
    const res = await request(app)
      .get('/api/stack');

      expect(res.statusCode).toEqual(200);
      expect(res.body.value).toBe('text');
  })

  it('Should return undefined', async () => {
    const res = await request(app)
      .get('/api/stack');

      expect(res.statusCode).toEqual(200);
      expect(res.body.value).toBe(undefined);
  })
})
