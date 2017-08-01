var ObjectID = require('mongodb').ObjectID;

exports.listarPin = function (req, res) {
   var userPin = req.params.pin;
   console.log(userPin);
    function callback(err, result) {
        if (err) {
            return res.sendStatus(503);
        };
        res.send(result);
    }
    req.db.collection('contas').findOne({"pin": Number(userPin)}, callback);
};

exports.listar = function (req, res) {
    function callback(err, result) {
        if (err) {
            return res.sendStatus(503);
        };

        res.send(result);
    }
    req.db.collection('contas').find().toArray(callback);
};

exports.criar = function (req, res) {
    function callback(err, result) {
        if (err) {
            return res.sendStatus(503);
        }
        res.sendStatus(201);
    }

    req.db.collection('contas').save(req.body, callback);
};


exports.pedido = function (req, res) {
  var userPin = req.params.pin;

  req.db.collection('contas').update({"pin": Number(userPin)}, { "$push": {pedidos: req.body} }, function(err, result) {
    if (err) {
      return res.sendStatus(503);
    }

    res.send(result);
  });
};

exports.fechar = function (req, res) {
  var userPin = req.params.pin;

  req.db.collection('contas').update({"pin": Number(userPin)}, { "$set": {fechado: true} }, function(err, result) {
    if (err) {
      return res.sendStatus(503);
    }

    res.send(result);
  });
};

exports.atualizarQuant = function (req, res) {
   var userPin = req.params.pin;
  var prod = req.params.prod;

  req.db.collection('contas').update({"pin": Number(userPin), "pedidos.nome":prod}, {"$inc": { "pedidos.$.quantidade":1}}, function(err, result) {
    if (err) {
      return res.sendStatus(503);
    }

    res.send(result);
  });
};

// gerarPin(){
//   return Math.floor(Math.random() * 10000);
// }
