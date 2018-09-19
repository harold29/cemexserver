var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var types = require('tedious').TYPES;

// Create connection to database
const conf = require('../config');

var config = {
  userName: conf.get('AZURE_DB_USER'),
  password: conf.get('AZURE_DB_PASSWORD'),
  server: conf.get('AZURE_DB_HOST'),
  options:
    {
      database: conf.get('AZURE_DB')
      , encrypt: true
    }
};

// var connection = new Connection(config);


// Traer un usuario específico con cemexId y n_empleado
function readUsuario (cemexId, n_empleado, cb) {
  var query = "SELECT TOP(1) * FROM dbo.usuario WHERE cemex_id = @c_id AND n_empleado = @n_empl";
  var usuario = [];
  var connection = new Connection(config);

  connection.on('connect', function(err) {
    if (err) {
      console.log(err);
      cb(err);
    } else {
      var request = new Request(query, function(error, rowCount, rows) {
        if (error) {
          console.log(error)
          cb(error);
        };
        console.log(rowCount + 'row(s) returned');

        connection.close();
      });

      request.addParameter('c_id', types.VarChar, cemexId);
      request.addParameter('n_empl', types.VarChar, n_empleado);

      request.on('row', function(columns) {
        var col = {}
        columns.forEach(function(column) {
          col[column.metadata.colName] = column.value;
        })
        usuario.push(col);
      });

      request.on('doneInProc', function() {
        cb(null, usuario);
      });

      connection.execSql(request);
    };
  });
}

// [START update Tipo_empleado]
function actualizarTipoEmpleado(tipoEmpleado, cemexId, cb) {
  var query = 'UPDATE dbo.usuario SET tipo_empleado = @t_empleado WHERE cemex_id = @c_id';
  var connection = new Connection(config);

  connection.on('connect', function(err) {
    if (err) {
      console.log(err);
      cb(err);
    } else {
      var request = new Request(query, function(error, rowCount, rows) {
        if (error) {
          console.log(error);
          cb(error);
        };
        console.log(rowCount + 'row(s) returned');

        connection.close();
      });

      request.addParameter('t_empleado', types.varChar, tipoEmpleado);
      request.addParameter('c_id', types.varChar, cemexId);

      request.on('row', function(columns) {
        cb(null, columns)
      });

      connection.execSql(request);
    };
  });
}
// [END update]

// [START list]
function usuarios(cb) {
  var query = 'SELECT id, nombre, apellido, n_documento, cargo, vicepresidencia FROM dbo.usuario ORDER BY apellido';
  var result = [];
  var connection = new Connection(config);

  connection.on('connect', function(err) {
    if (err) {
      console.log(err);
      cb(err);
    } else {
      var request = new Request(query, function(error, rowCount, rows) {
        if (error) {
          console.log(error);
          cb(error);
        };
        console.log(rowCount + 'row(s) returned');
        connection.close();
      });

      request.on('row', function(columns) {
        var col = {}
        columns.forEach(function(column) {
          col[column.metadata.colName] = column.value;
        })
        result.push(col);
      });

      request.on('doneInProc', function() {
        cb(null, result);
      });

      connection.execSql(request);
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
