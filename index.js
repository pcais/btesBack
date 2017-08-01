var express = require('express')
var bodyParser = require('body-parser');
var expressMongoDb = require('express-mongo-db');
var cors = require('cors');

var basicAuth = require('basic-auth');
var stripe = require('stripe')('sk_test_tXbWRqZLz0Wg21W6emKjQ4y4'); //paste your test secret here

var pedidoController = require('./controllers/pedido.js');
var usuariosController = require('./controllers/usuarios.js');

// inicializa o express //comentado pro socket
var app = express();
var router = express.Router();//stripe

//socket.io
// var app = require('express')();
// var http = require('http').Server(app);
// var io = require('socket.io')(http);

// inicializa o body parser
app.use(bodyParser.json());

// inicializa mongo e expoe para o express
app.use(expressMongoDb('mongodb://localhost:27017/contas'));
app.use(cors());

// inicializa o servidor na porta especificada //comentado pro socket
app.listen(3001, '0.0.0.0', function() {
   console.log('Servidor inicializado');
});

//socket.io
// io.on('connection', function(socket){
//   socket.on('add', function(){  //escuta uma funcao com o nome add
//      socket.emit('add', pedidoController.atualizarQuant) //fazz algo quando escutar essa funcao
//  });
//   socket.on('item', function(){  //escuta uma funcao com o nome add
//      socket.emit('item', pedidoController.pedido) //fazz algo quando escutar essa funcao
//  });
//  //  socket.on('fechar', function(){  //escuta uma funcao com o nome add
//  //     socket.emit('fechar',  pedidoController.fechar) //fazz algo quando escutar essa funcao
//  // });
// });

// http.listen(3001, function(){
//   console.log('listening on *:3001');
// })

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//stripe
// router.post('/processpay', function (request, response) {
//     var stripetoken = request.body.stripetoken;
//     var amountpayable = request.body.amount;
//     var charge = stripe.charge.create({
//         amount: amountpayable,
//         currency: 'usd',
//         description: 'Sample transaction',
//         source: stripetoken
//     }, function (err, charge) {
//         if (err)
//             console.log(err);
//         else
//             response.send({ success: true });
//     })
// })
// app.use(router);

var auth = function (req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.sendStatus(401);
  };

  // traduz o cabecalho Authorization para o objeto user
var user = basicAuth(req);


req.db.collection('usuarios').findOne(req.body, function(err, result) {
  if (err) {
    return unauthorized(res);
  }

  if (!result) {
    return unauthorized(res);
  }

  next();
});
};


// Endpoints
//pedidos
app.get('/contas/:pin', pedidoController.listarPin);
app.get('/contas', pedidoController.listar);
app.post('/contas', pedidoController.criar);
app.put('/contas/:pin', pedidoController.pedido);
app.put('/contas/:pin/add/:prod', pedidoController.atualizarQuant);
app.put('/contas/fechar/:pin', pedidoController.fechar);

//usuario
app.post('/usuarios', usuariosController.criarUser);
// app.get('/all/usuarios', usuariosController.listarUser); //TODO erro ligando o server
app.get('/usuarios', auth, usuariosController.logUser);
