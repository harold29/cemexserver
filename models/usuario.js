var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var types = require('tedious').TYPES;

// Create connection to database
var config =
   {
     userName: 'someuser', // update me
     password: 'somepassword', // update me
     server: 'edmacasqlserver.database.windows.net', // update me
     options:
        {
           database: 'somedb' //update me
           , encrypt: true
        }
   }
var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err)
   {
     if (err)
       {
          console.log(err)
       }
    else
       {
           queryDatabase()
       }
   }
 );

 // Traer un usuario específico con cemexId y n_empleado
function readUsuario (cemexId, n_empleado, cb) {

}
