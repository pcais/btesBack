var ObjectID = require('mongodb').ObjectID;

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


//1. post com todo menu e só atualiza as quantidades e [hidden]="quantidade=0"
//2. if ja pediram o item atualiza só a quantidade else insert o item
exports.atualizar = function (req, res) {
  var id = req.params.id;

  req.db.collection('contas').update({_id: ObjectID(id)}, { $set: req.body }, function(err, result) {
    if (err) {
      return res.sendStatus(503);
    }

    res.send(result);
  });
};

gerarPin(){
  return Math.floor(Math.random() * 10000);
}
