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

// Attempt to connect and execute queries if connection goes through
// connection.on('connect', function(err)
//    {
//      if (err)
//        {
//           console.log(err)
//        }
//     else
//        {
//            queryDatabase()
//        }
//    }
//  );

 // Traer un usuario específico con cemexId y n_empleado
function readUsuario () {
  // var query = "SELECT * FROM `usuario` WHERE cemex_id = @id AND n_empleado = @nempleado LIMIT 1";
  var query = "SELECT * FROM dbo.usuario";

  connection.on('connect', function(err) {
    if (err) {
      console.log(err)
    } else {
      var request = new Request(query, function(error, rowCount, rows) {
        console.log(rowCount + ' row(s) returned');
        process.exit();
      });

      request.on('row', function(columns) {
        columns.forEach(function(column) {
            console.log("%s\t%s", column.metadata.colName, column.value);
         });
      });
      connection.execSql(request);
    };
  });
};


function actualizarTipoEmpleado(tipoEmpleado, cemexId, cb) {
  var query = 'UPDATE dbo.usuario SET tipo_empleado = @t_empleado WHERE cemex_id = @c_id';


}

function cursosUsuario(idUsuario, cb) {
  var query = 'SELECT dbo.curso.id, dbo.curso.name, dbo.curso.imagen FROM dbo.puntaje INNER JOIN dbo.modulo ON dbo.puntaje.modulo_id = dbo.modulo.id INNER JOIN dbo.curso ON dbo.modulo.curso_id = dbo.curso.id WHERE dbo.puntaje.usuario_id = @user_id GROUP BY dbo.curso.id, dbo.curso.name';
}

function usuarios(cb) {
  var query = 'SELECT id, nombre, apellido, n_documento, cargo, vicepresidencia FROM dbo.usuario ORDER BY apellido';
}

module.exports = {
  readUsuario : readUsuario,
  actualizarTipoEmpleado : actualizarTipoEmpleado,
  cursosUsuario : cursosUsuario,
  usuarios : usuarios
}
