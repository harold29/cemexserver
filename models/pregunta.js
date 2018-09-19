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

function cargarPreguntasBinarias(idModulo, cb) {
  var query = 'SELECT * FROM dbo.pregunta_binaria. dbo.pregunta WHERE dbo.pregunta.modulo_id = @i_mod AND dbo.pregunta.id = dbo.pregunta_binaria.pregunta_id';
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

      request.addParameter('i_mod', types.Int, idModulo);

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

function cargarPreguntasMultiples(idModulo, cb) {
  var query = 'SELECT * FROM dbo.pregunta_multiple, dbo.pregunta WHERE dbo.pregunta.modulo_id = @i_mod AND dbo.pregunta.id = dbo.pregunta_multiple.pregunta_id';
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

      request.addParameter('i_mod', types.Int, idModulo);

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

function cargarPreguntasRelacion(idModulo, cb) {
  var query = 'SELECT * FROM dbo.pregunta_multiple, dbo.pregunta WHERE dbo.pregunta.modulo_id = @i_mod AND dbo.pregunta.id = dbo.pregunta_multiple.pregunta_id';
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

      request.addParameter('i_mod', types.Int, idModulo);

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
  cargarPreguntasBinarias : cargarPreguntasBinarias,
  cargarPreguntasMultiples : cargarPreguntasMultiples,
  cargarPreguntasRelacion : cargarPreguntasRelacion
};
