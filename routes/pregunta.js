'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

function getPregunta() {
  return require('../models/pregunta');
};

router.use(bodyParser.json());

/**
 * GET /api/ili/preguntasbinarias/:MODULO_id
 *
 */
router.get('/preguntasbinarias/:MODULO_id', (req, res, next) => {

  getPregunta().cargarPreguntasBinarias(req.params.MODULO_id, (err, entities) => {
    if (err) {
      next(err);
      return;
    }
     res.json({"Error" : false, "Message" : "preguntas cargadas satisfactoriamente", "preguntas" : entities, "Tipo" : "Binaria"});
  });
});

/**
 * GET /api/ili/preguntasmultiples/:MODULO_id
 *
 */
router.get('/preguntasmultiples/:MODULO_id', (req, res, next) => {

  getPregunta().cargarPreguntasMultiples(req.params.MODULO_id, (err, entities) => {
    if (err) {
      next(err);
      return;
    }
     res.json({"Error" : false, "Message" : "preguntas cargadas satisfactoriamente", "preguntas" : entities, "Tipo" : "Multiple"});
  });
});

/**
 * GET /api/ili/preguntasrelacion/:MODULO_id
 *
 */
router.get('/preguntasrelacion/:MODULO_id', (req, res, next) => {

  getPregunta().cargarPreguntasRelacion(req.params.MODULO_id, (err, entities) => {
    if (err) {
      next(err);
      return;
    }
     res.json({"Error" : false, "Message" : "preguntas cargadas satisfactoriamente", "preguntas" : entities, "Tipo" : "Relacion"});
  });
});

module.exports = router;
