

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "ecommerce.c56ayiprrn3s.us-west-2.rds.amazonaws.com",
  user: "admin",
  password: "12345678",
  database: "ecommerce"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

//Signup API for state fetch
exports.handler = (event, context) => {
    let countryId = req.body.countryid;
  
    let sql ="SELECT c.id, c.txtCountryname, s.id, s.txtStatename, s.refCountryName FROM tblCountry c JOIN tblState s ON s.refCountryName = c.id WHERE c.id ="+countryId;
  
  
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      // res.send(result);
      context.succeed('Success');    
    });
  };