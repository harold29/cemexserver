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

function actualizarPuntaje(valor, idModulo, idUsuario, cb) {
  // NOTE: THIS QUERY ARE NOT CORRECTLY TRANSLATED, PLEASE CHECK model-cloudsql.js IN THE CODEBASE -- TESTED AND WORKING FINE
  var query = 'INSERT INTO dbo.puntaje (valor, modulo_id, usuario_n_documento) VALUES (@val, @id_mod, @id_us)';
  var result = [];
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

      request.addParameter('val', types.Float, valor);
      request.addParameter('id_mod', types.Int, idModulo);
      request.addParameter('id_us', types.VarChar, idUsuario);

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

function cargarRankingTotal(cb) {
  var query = "SELECT dbo.usuario.nombre, dbo.usuario.apellido, SUM(dbo.puntaje.valor) as valorPuntaje FROM dbo.puntaje INNER JOIN dbo.usuario ON dbo.puntaje.usuario_n_documento=dbo.usuario.n_documento INNER JOIN dbo.modulo ON dbo.puntaje.modulo_id=dbo.modulo.id GROUP BY dbo.usuario.n_documento, dbo.usuario.nombre, dbo.usuario.apellido ORDER BY valorPuntaje DESC";
  var result = [];
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

module.exports = {
  actualizarPuntaje : actualizarPuntaje,
  cargarRankingTotal : cargarRankingTotal,
};
