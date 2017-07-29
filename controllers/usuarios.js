var ObjectID = require('mongodb').ObjectID;

// cria um novo usuario
exports.criarUser = function (req, res) {
  var u = req.body;

  if (!verificaSenha(res, u, 8)) {
    return;
  }

  req.db.collection('usuarios').save(u, function(err, result) {
    if (err) {
      return res.sendStatus(503);
    }

    res.sendStatus(201);
  });
};

exports.logUser = function (req, res) {
  req.db.collection('usuarios').find().toArray(function(err, alunos) {
    if (err) {
      return res.sendStatus(503);
    }

    res.send(alunos);
  });
};

exports.listarUsers = function (req, res) {
    function callback(err, result) {
        if (err) {
            return res.sendStatus(503);
        };

        res.send(result);
    }
    req.db.collection('usuarios').find().toArray(callback);
};


function verificaSenha(res, u, minLength) {
  // if (!u.usuario || !u.senha) {
  //   res.sendStatus(400);
  //   return false;
  // }

  if (u.senha.length < minLength) {
    res.status(400).send("senha invalida, verifique o minimo de caracteres=" + minLength);
    return false;
  }

  if (u.senha != u.confirmsenha) {
    res.status(400).send("senha invalida, verifique o minimo de caracteres=" + minLength);
    return false;
  }

  if (!verificaPadraoSenha(u.senha)) {
    res.status(400).send("padrao senha invalido");
    return false;
  }

  return true;
}

function verificaPadraoSenha(senha) {
  return true;
}
