

// var mysql = require('mysql');

// var con = mysql.createConnection({
//   host: "ecommerce.c56ayiprrn3s.us-west-2.rds.amazonaws.com",
//   user: "admin",
//   password: "12345678",
//   database: "ecommerce"
// });

// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });


// //Signup API for country fetch
// exports.handler = (event, context) => {
//   con.query("SELECT id,txtCountryname FROM tblCountry;", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//     // res.send(result);
//     context.succeed('Success');
    
//   });
// };



var mysql = require('mysql');
var connection = mysql.createConnection({
      host     : 'ecommerce.c56ayiprrn3s.us-west-2.rds.amazonaws.com',
      user     : 'admin',
      password : '12345678',
      database : 'ecommerce'
});
connection.connect(function(err){
      if(!err) {
            console.log("Database is connected ... nn");
      }
      else {
            console.log("Error connecting database ... nn");
      }
});



exports.handler = (event, context, callback) => {
  // allows for using callbacks as finish/error-handlers
  context.callbackWaitsForEmptyEventLoop = false;
  const sql = "SELECT id,txtCountryname FROM tblCountry;";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    callback(null, result)
  });
};
