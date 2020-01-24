var express = require('express')
var bodyParser = require('body-parser');
var expressMongoDb = require('express-mongo-db');
var cors = require('cors');

var basicAuth = require('basic-auth');
// var stripe = require('stripe')('sk_test_tXbWRqZLz0Wg21W6emKjQ4y4'); 

// inicializa o express
var app = express();
var router = express.Router();//stripe

//socket.io
var http = require('http').Server(app);
// var io = require('socket.io')(http);

var pedidoController = require('./controllers/pedido.js');
// var usuariosController = require('./controllers/usuarios.js');

// inicializa o body parser
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false })); //stripe

// inicializa mongo e expoe para o express
app.use(expressMongoDb('mongodb://localhost:27017/receitas'));
app.use(cors());

// inicializa o servidor na porta especificada
// app.listen(3001, '0.0.0.0', function() {
//    console.log('Servidor inicializado');
// });

// //socket.io
// io.on('connection', function(socket){
//  console.log('a user connected');
// });

http.listen(3001, function(){ //socket
  console.log('listening on *:3001');
})

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// // stripe
// app.use(router.post('/processpay', function (request, response) {
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
// );

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
app.get('/contas', pedidoController.listarCat);
// app.get('/contas', pedidoController.listarPratos);
// app.post('/contas', pedidoController.criar);
// app.put('/contas/:pin', pedidoController.pedido);
// app.put('/contas/:pin/add/:prod', pedidoController.atualizarQuant);
// app.put('/contas/fechar/:pin', pedidoController.fechar);

// //usuario
// app.post('/usuarios', usuariosController.criarUser);
// app.get('/all/usuarios', usuariosController.listarUsers);
// app.get('/usuarios', auth, usuariosController.logUser);
// db.receitas.insert( { _id: 2, base: "Arroz", principal: "Tofu", gbase: 100, gprincipal: 85, caterogia: "vegano", nome: "Tofu com Arroz" } )
// db.receitas.insert( { _id: 3, base: "Arroz", principal: "Ovo", gbase: 100, gprincipal: 78, caterogia: "vegetariano", nome: "Tofu com Arroz" } )