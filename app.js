var express = require('express');
var app = express();

const mysql = require('mysql');
// connection configurations
const mc = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'example',
  database: 'visitors'
});
// connect to database
mc.connect();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/users', function(req, res){
    res.send('Users summary');
});

// Retrieve all users 
app.get('/api/users', function (req, res) {
  mc.query('SELECT * FROM user', function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results, message: 'Todos list.' });
  });
});

// Retrieve user with id 
app.get('/api/users/:id', function (req, res) {
 
  let user_id = req.params.id;
  if (!user_id) {
      return res.status(400).send({ error: true, message: 'Please provide user_id' });
  }

  mc.query('SELECT * FROM user where id_user=?', user_id, function (error, results, fields) {
      if (error) throw error;
      return res.send({ error: false, data: results[0], message: 'Users list.' });
  });

});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});