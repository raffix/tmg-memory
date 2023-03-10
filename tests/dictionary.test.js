const request = require('supertest')
const app = require('../src')

describe('Add to dictionary', () => {
  describe('send valid params', () => {
    it('should return success', async () => {
      const res = await request(app)
        .post('/api/dictionary')
        .send({
          key: 'name',
          value: 'John',
          ttl: 10
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toBe('Added the key-value');
    })

    it('should return success with a message warning this key already in use', async () => {
      const res = await request(app)
        .post('/api/dictionary')
        .send({
          key: 'name',
          value: 'John'
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBe('This key already in use');
    })

    it('should return success', async () => {
      const res = await request(app)
        .post('/api/dictionary')
        .send({
          key: 'key2',
          value: 'John',
          ttl: 0
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toBe('Added the key-value');
    })

    it('should return success', async () => {
      const res = await request(app)
        .post('/api/dictionary')
        .send({
          key: '48e2f43456bbe5d532e98047b1c01ca1',
          value: 'text value',
          ttl: 1
        });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toBe('Added the key-value');
    })
  })

  describe('send invalid params', () => {
    it('should error with invalid params message', async () => {
      const res = await request(app)
        .post('/api/dictionary')
        .send({
          key: '',
          value: ''
        });

      expect(res.statusCode).toEqual(500);
      expect(res.body).toBe('Invalid params');
    })

    it('should error with invalid params message', async () => {
      const res = await request(app)
        .post('/api/dictionary')
        .send({
          key: 'realKey',
          value: ''
        });

      expect(res.statusCode).toEqual(500);
      expect(res.body).toBe('Invalid params');
    })
  })
})

describe('Get from dictionary', () => {
  describe('send valid params', () => {
    it('Should return John', async () => {
      const res = await request(app)
        .get('/api/dictionary/name');
  
        expect(res.statusCode).toEqual(200);
        expect(res.body.value).toBe('John');
    })

    it('Should return text value', async () => {
      const res = await request(app)
        .get('/api/dictionary/48e2f43456bbe5d532e98047b1c01ca1');
  
        expect(res.statusCode).toEqual(200);
        expect(res.body.value).toBe('text value');
    })

    it('Should return empty text value', async () => {
      await new Promise((r) => setTimeout(r, 1500))

      const res = await request(app)
        .get('/api/dictionary/48e2f43456bbe5d532e98047b1c01ca1');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBe('');
    })

    it('Should return a empty value', async () => {
      const res = await request(app)
        .get('/api/dictionary/key-new');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBe('');
    })
  })

  describe('send invalid params', () => {
    it('Should return error the error code 404', async () => {
      await new Promise((r) => setTimeout(r, 1500))

      const res = await request(app)
        .get('/api/dictionary');

      expect(res.statusCode).toEqual(404);
    })
  })
})

describe('Delete from dictionary', () => {
  describe('send valid params', () => {
    it('Should return message Key deleted', async () => {
      const res = await request(app)
        .delete('/api/dictionary/name');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toBe('Key deleted');
    })

    it('Should return message Key not found', async () => {
      const res = await request(app)
        .delete('/api/dictionary/alternative-key');

      expect(res.statusCode).toEqual(404);
      expect(res.body).toBe('Key not found');
    })
  })

  describe('send invalid params', () => {
    it('Should return 404 error', async () => {
      const res = await request(app)
        .delete('/api/dictionary');

      expect(res.statusCode).toEqual(404);
    })
  })
})
