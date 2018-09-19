'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

function getCurso() {
  return require('../models/curso');
};

router.use(bodyParser.json());

/**
 * GET /api/ili/curso/:CATEGORIA_id
 *
 */
router.get('/curso/:CATEGORIA_id', (req, res, next) => {

  getCurso().cargarCursos(req.params.CATEGORIA_id, (err, entities) => {
    if (err) {
      next(err);
      return;
    }
    res.json({"Error" : false, "Message" : "Cursos cargados satisfactoriamente", "Cursos" : entities});
  });
});

/**
 * GET /api/ili/ranking/:CURSO_id
 *
 */
router.get('/ranking/:CURSO_id', (req, res, next) => {

  getCurso().cargarRankingCurso(req.params.CURSO_id, (err, entities) => {
    if (err) {
      next(err);
      return;
    }
     res.json({"Error" : false, "Message" : "Ranking cargado satisfactoriamente", "Ranking" : entities});
  });
});

/**
 * GET /api/ili/cursosUsuario/:USUARIO_id
 *
 */
router.get('/cursosUsuario/:USUARIO_id', (req, res, next) => {

  getCurso().cursosUsuario(req.params.USUARIO_id, (err, entities) => {
    if (err) {
      next(err);
      return;
    }
     res.json({"Error" : false, "Message" : "Cursos del usuario cargados satisfactoriamente", "Cursos" : entities});
  });
});

/**
 * GET /api/ili/cursos
 *
 */
router.get('/cursos', (req, res, next) => {

  getCurso().cursos((err, entities) => {
    if (err) {
      next(err);
      return;
    }
     res.json({"Error" : false, "Message" : "Cursos cargados satisfactoriamente", "Cursos" : entities});
  });
});

/**
 * GET /api/ili/modulosCursoConPuntaje/:USUARIO_id/:CURSO_id
 *
 */
router.get('/modulosCursoConPuntaje/:USUARIO_id/:CURSO_id', (req, res, next) => {

  getCurso().modulosCursoConPuntaje(req.params.USUARIO_id, req.params.CURSO_id, (err, entities) => {
    if (err) {
      res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      return;
    }
     res.json({"Error" : false, "Message" : "Módulos del curso cargados satisfactoriamente", "Modulos" : entities});
  });
});

/**
 * PUT /api/ili/asignacionCursos
 *
 */
router.put("/asignacionCursos", (req, res, next) => {

  getCurso().asignacionCursos(req.body.ASIGNACIONES_CURSOS, (err, entities) => {
    if (err) {
      res.json({"Error" : true, "Message" : "Error en la asignación. Contacta al administrador de la App.", "err" : err.message});
      return;
    }
     res.json({"Error" : false, "Message" : "Cursos asignados correctamente"});
  });
});

/**
 * GET /api/ili/avanceCursosAsignados/:USUARIO_id
 *
 */
router.get('/avanceCursosAsignados/:USUARIO_id', (req, res, next) => {

  getCurso().avanceCursosAsignados(req.params.USUARIO_id, (err, entities) => {
    if (err) {
      res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      return;
    }
     res.json({"Error" : false, "Message" : "Avance de los cursos cargados satisfactoriamente", "Avance" : entities});
  });
});

module.exports = router;
