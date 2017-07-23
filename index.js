var express = require('express');
var bodyParser = require('body-parser');
var expressMongoDb = require('express-mongo-db');

var basicAuth = require('basic-auth');

var pedidoController = require('./controllers/pedido.js');

// inicializa o express
var app = express();

// inicializa o body parser
app.use(bodyParser.json());

// inicializa mongo e expoe para o express
app.use(expressMongoDb('mongodb://localhost:27017/contas'));

// inicializa o servidor na porta especificada
app.listen(3000, '0.0.0.0', function() {
  console.log('Servidor inicializado');
});

// var auth = function (req, res, next) {
//   function unauthorized(res) {
//     res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
//     return res.sendStatus(401);
//   };
//
//   // traduz o cabecalho Authorization para o objeto user
// var user = basicAuth(req);
//
// req.db.collection('contas').findOne({pin: conta.pin}, function(err, result) {
//   if (err) {
//     return unauthorized(res);
//   }
//
//   if (!result) {
//     return unauthorized(res);
//   }
//
//   next();
// });

// Endpoints
app.get('/contas', pedidoController.listar);
// app.get('/contas/:id', pedidoController.listar);
// app.get('/contas', auth, pedidoController.listar);
app.post('/contas', pedidoController.criar);
app.put('/contas/:id', pedidoController.atualizar);
