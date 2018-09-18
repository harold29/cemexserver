var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var types = require('tedious').TYPES;

// Create connection to database
var config =
   {
     userName: config.get('AZURE_DB_USER'), // update me
     password: config.get('AZURE_DB_PASSWORD'), // update me
     server: config.get('AZURE_DB_HOST'), // update me
     options:
        {
           database: config.get('AZURE_DB') //update me
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
    });
  };
};
  // request.addParameter
module.exports = {
  readUsuario : readUsuario
}



 //   query = mysql.format(query,table);
 //
 //   pool.getConnection(function(err, connection) {
 //     connection.query( query,
 //       (err, results) => {
 //         connection.release();
 //         if (err) {
 //           cb(err);
 //           return;
 //         }
 //         cb(null, results);
 //       });
 //    });
 // }
