module.exports = function(io){
   var pedido = {}
   var ObjectID = require('mongodb').ObjectID;

   pedido.listarPin = function (req, res) {
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

   pedido.listar = function (req, res) {
       function callback(err, result) {
           if (err) {
               return res.sendStatus(503);
           };

           res.send(result);
       }
       req.db.collection('contas').find().toArray(callback);
   };

   pedido.criar = function (req, res) {
       function callback(err, result) {
           if (err) {
               return res.sendStatus(503);
           }
           res.sendStatus(201);
       }

       req.db.collection('contas').save(req.body, callback);
   };


   pedido.pedido = function (req, res) {
     var userPin = req.params.pin;

     req.db.collection('contas').update({"pin": Number(userPin)}, { "$push": {pedidos: req.body} }, function(err, result) {
       if (err) {
         return res.sendStatus(503);
       }

       res.send(result);
     });

     io.emit('novopedido', userPin)
   };

   pedido.fechar = function (req, res) {
     var userPin = req.params.pin;

     req.db.collection('contas').update({"pin": Number(userPin)}, { "$set": {fechado: true} }, function(err, result) {
       if (err) {
         return res.sendStatus(503);
       }

       res.send(result);
     });
     io.emit('fechar', userPin)

   };

   pedido.atualizarQuant = function (req, res) {
      var userPin = req.params.pin;
     var prod = req.params.prod;

     req.db.collection('contas').update({"pin": Number(userPin), "pedidos.nome":prod}, {"$inc": { "pedidos.$.quantidade":1}}, function(err, result) {
       if (err) {
         return res.sendStatus(503);
       }

       res.send(result);
     });
     io.emit('inc', userPin)

   };
   return pedido
}
