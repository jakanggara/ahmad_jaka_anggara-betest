import test from 'tape';
import request from 'supertest';
import app from '../src/app';

const loginUser = {
  emailAddress: 'login@email.com',
  accountNumber: 12345678,
  identityNumber: 1101010101990001,
  userName: 'login'
};

// REGISTER
test('POST register', t => {
  request(app)
  .post('/register')
  .send(loginUser)
  .expect('Content-Type', /json/)
  .expect(201)
  .end((err, res) => {
    if (err) {
      t.error(err, 'Request failed');
      t.end();
    } else {
      t.equal(res.body.message, 'success', 'Response message should be "success"');
      t.equal(typeof res.body.data, 'object', 'Response data should be an object');
      t.end();
    }
  })
});

// login
test('POST login', t => {
  request(app)
  .post('/login')
  .send({email: loginUser.emailAddress})
  .expect('Content-Type', /json/)
  .expect(200)
  .end((err, res) => {
    if (err) {
      t.error(err, 'Request failed');
      t.end();
    } else {
      const { token } = res.body;
        t.ok(token, 'Response should contain a token');
        t.equal(typeof token, 'string', 'Token should be a string');

        // Check if token starts with "Bearer "
        const bearerRegex = /^Bearer /;
        t.ok(bearerRegex.test(token), 'Token should start with "Bearer "');
        t.end();
    }
  })
});