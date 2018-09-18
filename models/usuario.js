var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var types = require('tedious').TYPES;

// Create connection to database
const conf = require('../config');

var config =
   {
     userName: conf.get('AZURE_DB_USER'),
     password: conf.get('AZURE_DB_PASSWORD'),
     server: conf.get('AZURE_DB_HOST'),
     options:
        {
           database: conf.get('AZURE_DB')
           , encrypt: true
        }
   }
var connection = new Connection(config);

 // Traer un usuario específico con cemexId y n_empleado
function readUsuario (cemexId, n_empleado, cb) {
  var query = "SELECT * FROM `usuario` WHERE cemex_id = @c_id AND n_empleado = @n_empl LIMIT 1";

  connection.on('connect', function(err) {
    if (err) {
      console.error(err);
      cb(err);
    } else {
      var request = new Request(query, function(error, rowCount, rows) {
        if (error) {
          console.error(error)
          cb(error);
        };
        console.log(rowCount + 'row(s) returned');
        process.exit();
      });

      request.addParameter('c_id', TYPES.Int, cemexId);
      request.addParameter('n_empl', TYPES.varChar, n_empleado);

      request.on('row', function(columns) {
        cb(null, columns)
      });

      connection.execSql;
    };
  });
};

// [START update Tipo_empleado]
function actualizarTipoEmpleado(tipoEmpleado, cemexId, cb) {
  var query = 'UPDATE dbo.usuario SET tipo_empleado = @t_empleado WHERE cemex_id = @c_id';

  connection.on('connect', function(err) {
    if (err) {
      console.error(err);
      cb(err);
    } else {
      var request = new Request(query, function(error, rowCount, rows) {
        if (error) {
          console.error(error)
          cb(error);
        };
        console.log(rowCount + 'row(s) returned');
        process.exit();
      });

      request.addParameter('t_empleado', TYPES.varChar, tipoEmpleado);
      request.addParameter('c_id', TYPES.varChar, cemexId);

      request.on('row', function(columns) {
        cb(null, columns)
      });

      connection.execSql;
    };
  });
}
// [END update]

// [START list]
function cursosUsuario(idUsuario, cb) {
  var query = 'SELECT dbo.curso.id, dbo.curso.name, dbo.curso.imagen FROM dbo.puntaje INNER JOIN dbo.modulo ON dbo.puntaje.modulo_id = dbo.modulo.id INNER JOIN dbo.curso ON dbo.modulo.curso_id = dbo.curso.id WHERE dbo.puntaje.usuario_id = @user_id GROUP BY dbo.curso.id, dbo.curso.name';

  connection.on('connect', function(err) {
    if (err) {
      console.error(err);
      cb(err);
    } else {
      var request = new Request(query, function(error, rowCount, rows) {
        if (error) {
          console.error(error)
          cb(error);
        };
        console.log(rowCount + 'row(s) returned');
        process.exit();
      });

      request.addParameter('user_id', TYPES.Int, idUsuario);

      request.on('row', function(columns) {
        cb(null, columns)
      });

      connection.execSql;
    };
  });
}
// [END list]

// [START list]
function usuarios(cb) {
  var query = 'SELECT id, nombre, apellido, n_documento, cargo, vicepresidencia FROM dbo.usuario ORDER BY apellido';

  connection.on('connect', function(err) {
    if (err) {
      console.error(err);
      cb(err);
    } else {
      var request = new Request(query, function(error, rowCount, rows) {
        if (error) {
          console.error(error)
          cb(error);
        };
        console.log(rowCount + 'row(s) returned');
        process.exit();
      });

      request.on('row', function(columns) {
        cb(null, columns)
      });

      connection.execSql;
    };
  });
}
// [END list]

module.exports = {
  readUsuario : readUsuario,
  actualizarTipoEmpleado : actualizarTipoEmpleado,
  cursosUsuario : cursosUsuario,
  usuarios : usuarios
}
