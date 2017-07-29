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
  var id = req.params.id;

  req.db.collection('contas').update({_id: ObjectID(id)}, { "$push": {pedidos: req.body} }, function(err, result) {
    if (err) {
      return res.sendStatus(503);
    }

    res.send(result);
  });
};

exports.atualizarQuant = function (req, res) {
  var id = req.params.id;
  var prod = req.params.prod;

  req.db.collection('contas').update({_id: ObjectID(id), "pedidos.nome":prod}, {"$inc": { "pedidos.$.quantidade":1}}, function(err, result) {
    if (err) {
      return res.sendStatus(503);
    }

    res.send(result);
  });
};

// gerarPin(){
//   return Math.floor(Math.random() * 10000);
// }
