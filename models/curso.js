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

function cargarCursos(idCategoria, cb) {
  var query = 'SELECT * FROM dbo.curso WHERE categoria_id = @c_id';
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

      request.addParameter('c_id', types.Int, idCategoria);

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

function cargarRankingCurso(idCurso, cb) {
  var query = 'SELECT dbo.usuario.nombre, dbo.usuario.apellido, SUM(dbo.puntaje.valor) AS valorPuntaje FROM dbo.puntaje INNER JOIN dbo.usuario ON dbo.puntaje.usuario_n_documento = dbo.usuario.n_documento INNER JOIN dbo.modulo ON dbo.puntaje.modulo_id = dbo.modulo.id WHERE dbo.modulo.curso_id = @i_curso GROUP BY dbo.usuario.n_documento, dbo.usuario.nombre, dbo.usuario.apellido ORDER BY valorPuntaje DESC';
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

      request.addParameter('i_curso', types.Int, idCurso);

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

function cursos(cb) {
  var query = 'SELECT * FROM dbo.curso';
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

// [START list]
function cursosUsuario(idUsuario, cb) {
  var query = 'SELECT dbo.curso.id, dbo.curso.name, dbo.curso.imagen FROM dbo.puntaje INNER JOIN dbo.modulo ON dbo.puntaje.modulo_id = dbo.modulo.id INNER JOIN dbo.curso ON dbo.modulo.curso_id = dbo.curso.id WHERE dbo.puntaje.usuario_n_documento = @user_id GROUP BY dbo.curso.id, dbo.curso.name, dbo.curso.imagen';
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

      request.addParameter('user_id', types.Int, idUsuario);

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

function modulosCursoConPuntaje(idUsuario, idCurso, cb) {
  var query = 'SELECT dbo.modulo.curso_id, dbo.puntaje.modulo_id, dbo.modulo.nombre, dbo.puntaje.valor, dbo.usuario.n_documento AS USUARIO_id FROM dbo.puntaje INNER JOIN dbo.usuario ON dbo.puntaje.usuario_n_documento = dbo.usuario.n_documento INNER JOIN dbo.modulo ON dbo.puntaje.modulo_id = dbo.modulo.id WHERE dbo.puntaje.usuario_n_documento = @i_usuario AND dbo.modulo.curso_id = @i_curso ORDER BY dbo.puntaje.modulo_id';
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

      request.addParameter('i_usuario', types.VarChar, idUsuario);
      request.addParameter('i_curso', types.Int, idCurso);

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


function avanceCursosAsignados(idUsuario, cb) {
  var query = 'SELECT m.curso_id, c.name, ( SUM(p.valor)/ (COUNT(m.id)) ) AS progreso , c.imagen FROM dbo.modulo AS m LEFT JOIN dbo.puntaje AS p ON m.id = p.modulo_id AND p.usuario_n_documento = @n_doc INNER JOIN dbo.USUARIO_CURSO AS us ON m.curso_id = us.curso_id AND us.usuario_n_documento = @n_doc INNER JOIN dbo.curso AS c ON m.curso_id = c.id GROUP BY m.curso_id, c.name, c.imagen';
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

      request.addParameter('n_doc', types.VarChar, idUsuario);

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

function asignacionCursos(asignaciones, cb) {
  var query = 'INSERT INTO dbo.USUARIO_CURSO (usuario_n_documento, curso_id) VALUES @asig';
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

      request.addParameter('n_doc', types.VarChar, idUsuario);

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
  cargarCursos : cargarCursos,
  cargarRankingCurso : cargarRankingCurso,
  cursos : cursos,
  cursosUsuario : cursosUsuario,
  modulosCursoConPuntaje : modulosCursoConPuntaje,
  avanceCursosAsignados : avanceCursosAsignados,
  asignacionCursos : asignacionCursos
};
