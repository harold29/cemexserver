'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

function getModulo() {
  return require('../models/modulo');
};

router.use(bodyParser.json());

/**
 * GET /api/ili/modulos/:CURSO_id
 *
 */
router.get('/modulos/:CURSO_id', (req, res, next) => {

  getModulo().cargarModulos(req.params.CURSO_id, (err, entities) => {
    if (err) {
      next(err);
      return;
    }
     res.json({"Error" : false, "Message" : "Módulos cargados satisfactoriamente", "Modulos" : entities});
  });
});

/**
 * GET /api/ili/tips/:MODULO_id
 *
 */
router.get('/tips/:MODULO_id', (req, res, next) => {

  getModel().cargarTips(req.params.MODULO_id, (err, entities) => {
    if (err) {
      next(err);
      return;
    }
     res.json({"Error" : false, "Message" : "Tips cargados satisfactoriamente", "tips" : entities});
  });
});

module.exports = router;
