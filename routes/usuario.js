'use strict';

const express = require('express');
const bodyParser = require('body-parser');

function getModel () {
  return require(`./model-${require('../config').get('DATA_BACKEND')}`);
}

function getUser() {
  return require('../models/usuario');
}

const router = express.Router();

router.use(bodyParser.json());

router.get('/', (req, res, next) => {
  res.json({"Error" : false, "Message" : "HOLA MUNDO"});
});

router.get('/usuario/', (req, res, next) => {
  getUser().readUsuario((err, entities) => {
    if (err) {
      // next(err);
      res.json({"Error" : true, "Message" : "Error executing SQL SERVER query", "err" : err.message});
      return;
    }
    res.json({"Error" : false, "Message" : "Usuario cargado", "Usuarios" : entities});
  });
});


module.exports = router;
