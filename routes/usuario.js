'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

function getUser() {
  return require('../models/usuario');
};

router.use(bodyParser.json());

/**
 * GET /api/ili/usuario/:cemexId/:n_empleado
 *
 * Retrieve a user.
 */
router.get('/usuario/:cemex_id/:n_empleado', (req, res, next) => {

  console.log("PARAMETERS RECEIVED: " + req.params.cemex_id);
  console.log("PARAMETERS RECEIVED: " + req.params.n_empleado);
  getUser().readUsuario(req.params.cemex_id, req.params.n_empleado, (err, entity) => {
    if (err) {
      // next(err);
      console.log("ERROR IN THE REQUEST");
      res.json({"Error" : true, "Message" : "Error executing MySQL query"});
      return;
    }
    console.log("NO ERROR IN THE REQUEST");
    res.json({"Error" : false, "Message" : "Success", "UsersNumber" : entity.length, "Users" : entity});
    // console.log("RETURNED JSON");
  });
});

/**
 * PUT /api/ili/usuario/tipo_empleado
 *
 * Update el tipo de empleado de usuario.
 */
router.put('/usuario/tipo_empleado', (req, res, next) => {

  getUser().actualizarTipoEmpleado(req.body.tipo_empleado, req.body.cemex_id , (err, entity) => {
    if (err) {
      console.log("Error on actualizarTipoEmpleado method: " + err);
      res.json({"Error" : true, "Message" : "Error with database query"});
      return;
    }
    res.json({"Error" : false, "Message" : "Actualizado el tipo de empleado para el CemexId: " + req.body.cemex_id});
  });
});

/**
 * GET /api/ili/cursosUsuario/:USUARIO_id
 *
 */
router.get('/cursosUsuario/:USUARIO_id', (req, res, next) => {

  getUser().cursosUsuario(req.params.USUARIO_id, (err, entities) => {
    if (err) {
      console.log("Error on cursosUsuario method: " + err);
      next(err);
      return;
    }
     res.json({"Error" : false, "Message" : "Cursos del usuario cargados satisfactoriamente", "Cursos" : entities});
  });
});

/**
 * GET /api/ili/usuarios
 *
 */
router.get('/usuarios', (req, res, next) => {
  console.log("REQUEST RECEIVED");
  getUser().usuarios((err, entities) => {
    if (err) {
      console.log("Error on usuarios method: " + err);
      res.json({"Error" : true, "Message" : "Error with database query", "err" : err.message});
      return;
    }
     res.json({"Error" : false, "Message" : "Usuarios cargados satisfactoriamente", "Usuarios" : entities});
  });
});

module.exports = router;
