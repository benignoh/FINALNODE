var basicAuth = require('basic-auth');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
const jsrsasign = require('jsrsasign');


const tasks = require('./controller/tasks_controller.js');
var modelos = require ('./models/modelos').modelos;

app.use(bodyParser.urlencoded({ extended: true }));
 
app.use(bodyParser.json());

app.post('/api/tasks', tasks.add);

app.get('/api/tasks', tasks.show);

app.delete('/api/tasks/:id', tasks.delete)

app.post('/api/auth/token', tasks.getToken )

exports.app = app;