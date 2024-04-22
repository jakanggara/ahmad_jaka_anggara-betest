import mongoose from 'mongoose';
import test from 'tape';
import request from 'supertest';
import app from '../src/app';
import jwt from 'jsonwebtoken';

const User = mongoose.model('User');

const loginUser = {
  emailAddress: 'login@email.com',
  accountNumber: 12345678,
  identityNumber: 1101010101990001,
  userName: 'login'
};

var token = jwt.sign(loginUser, process.env.JWTSECRET ?? "");

// Login User
test('Test User Creation', async () => {
  const user = new User(loginUser);
  return await user.save();
});

// Get Users
test('GET /users', t => {
  request(app)
  .get('/users')
  .auth(token, {type: 'bearer'})
  .expect('Content-Type', /json/)
  .expect(200)
  .end((err, res) => {
    if (err) {
      t.error(err, 'Request failed');
      t.end();
    } else {
      t.equal(res.body.message, 'success', 'Response message should be "success"');
      t.ok(Array.isArray(res.body.data), 'Response data should be an array');
      t.end();
    }
  })
});

// Create User
test('POST /users', t => {
  var userID
  request(app)
  .post('/users')
  .send(loginUser)
  .auth(token, {type: 'bearer'})
  .expect('Content-Type', /json/)
  .expect(201)
  .end((err, res) => {
    if (err) {
      t.error(err, 'Request failed');
      t.end();
    } else {
      t.equal(res.body.message, 'success', 'Response message should be "success"');
      t.equal(typeof res.body.data, 'object', 'Response data should be an object');
      userID = res.body.data._id
      t.end();
    }
  })
  User.findByIdAndDelete(userID)
  
});

// Update user
test('PUT /users/:id', t => {
  User.create({
    userName: 'testuser',
    accountNumber: 1234567890,
    emailAddress: 'testuser@example.com',
    identityNumber: 1101010101990001
  }).then(newUser => {
    request(app)
    .put(`/users/${newUser._id}`)
    .auth(token, {type: 'bearer'})
    .send({ userName: 'new username' })
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      if (err) {
        t.error(err, 'Request failed');
        t.end()
      } else {
        t.equal(res.body.message, 'success');
        t.equal(res.body.data.userName, 'new username');
        t.end()
      }
      User.findByIdAndDelete(newUser._id)
    });
  });
});

// Delete User
test('DELETE /users/:id', t => {
  User.create({
    userName: 'testuser',
    accountNumber: '1234567890',
    emailAddress: 'testuser@example.com',
    identityNumber: 'TEST123'
  }).then(newUser => {
    request(app)
    .delete(`/users/${newUser._id}`)
    .auth(token, {type: 'bearer'})
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      if (err) {
        t.error(err, 'Request failed');
        t.end()
      } else {
        t.equal(res.body.message, 'success');
        t.end()
      }
    });
  });
});

test.onFinish(() => {
  console.log("Testing Finished");
  process.exit(0);
});