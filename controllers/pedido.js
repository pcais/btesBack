var ObjectID = require('mongodb').ObjectID;

 exports.listarCat = function (req, res) {
      function callback(err, result) {
          if (err) {
              return res.sendStatus(503);
          };

          res.send(result);
      }
      return req.db.collection('receitas').find('categoria').toArray(callback);
  };