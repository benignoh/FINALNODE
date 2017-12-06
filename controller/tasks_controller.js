var basicAuth = require('basic-auth');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var modelos = require ('../models/modelos').modelos;
var express = require('express');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
 

const jsrsasign = require('jsrsasign');

app.use(bodyParser.json());
exports.add = function(request, response){  

  response.setHeader('Content-Type', 'application/json');
  console.log(request.body.text);
  if (request.body.text && request.body.done && request.body.date) {
    if(modelos.length>0){
      var num = (modelos[modelos.length-1].id);
    }
    else{
      num = 0;
    }
    request.body.id = num+1;
    request.body.createdAt = new Date();
    request.body.updatedAt = new Date();
    modelos.push(request.body);
    response.send('{"id:":'+request.body.id+'}');
  }else{
    response.status(400);
    response.send("Not Found");
  }
  
};

exports.show = function(request,response){
    response.setHeader('Content-Type', 'application/json');
    response.send(modelos);
};

exports.delete = function(request,response){
    response.setHeader('Content-Type', 'application/json');
    var error = false;
    for (var i = 0; i < modelos.length; i++){
      if (modelos[i].id == request.params.id){
        modelos.splice(i,1);
        response.send("Registro eliminado :)");
      }
    }
      response.send("Not Found");
};

exports.getToken = function(request,response){
  
  response.setHeader('Content-Type', 'application/json');

  var usuario = request.body.username;
  var contraseña = request.body.password;

  let header = {
    alg: "HS256",
    typ: "JWT"
  };

  let payload = { 
  };

  payload.iat = jsrsasign.jws.IntDate.get('now');
  payload.user = usuario;
  payload.pass = contraseña;

 
  payload.secretCode = 'p4ssw0d';
  payload.currentState = 'purchase-cart';

  let secret_phrase = contraseña;
  let jwt = jsrsasign.jws.JWS.sign("HS256", JSON.stringify(header), JSON.stringify(payload), secret_phrase);

  jwtRespuesta = {"token": jwt}
  response.send(jwtRespuesta);
};