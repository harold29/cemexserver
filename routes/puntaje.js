'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

function getPuntaje() {
  return require('../models/puntaje');
};

router.use(bodyParser.json());

/**
 * PUT /api/ili/puntaje
 *
 */
router.put("/puntaje", (req, res, next) => {

  getPuntaje().actualizarPuntaje(req.body.valor, req.body.MODULO_id, req.body.USUARIO_id, (err, entities) => {
    if (err) {
      res.json({"Error" : true, "Message" : "Error executing MySQL query", "err" : err.message});
      return;
    }
     res.json({"Error" : false, "Message" : "Creado/Actualizado el puntaje para el id del usuario: " + req.body.USUARIO_id});
  });
});

/**
 * GET /api/ili/rankingTotal
 *
 */
router.get('/rankingTotal', (req, res, next) => {

  getPuntaje().cargarRankingTotal((err, entities) => {
    if (err) {
      next(err);
      return;
    }
     res.json({"Error" : false, "Message" : "Ranking total cargado satisfactoriamente", "Ranking" : entities});
  });
});

module.exports = router;
