const express = require('express')
const app = express()
const port = 3000

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});



app.get('/countryfetch', (req, res) => {
  con.query("SELECT id,txtCountryname FROM tblCountry", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
});
});

app.get('/statefetch', (req, res) => {
  con.query("SELECT c.id, c.txtCountryname, s.id, s.txtStatename, s.refCountry FROM tblCountry c JOIN  tblState s ON s.refCountry=c.idWHERE c.id = 1", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
});
});

app.put('/userinsert', (req, res) => {
  con.query("INSERT INTO tblUsers VALUES ('','abh123','123','Abin','Issac','india','kerala','abc','dpd','ekm','683562','910011277222','abintalks.com',1,'20220321 10:30:09 AM','20220323 11:10:09 AM',0), ('','','karthi','123','karthik','KR','india','tamil nadu','def','mint','chennai','600003','910215974476','fun4u.com',1,'20220215 12:51:19 PM','20220310 08:45:16 AM',0), ('','','John','123','John','Martines','America','Florida','hij','10th avenue','acksonville','32034','12375844010','johnmartines.com',0,'20220104 07:32:58 PM','20220202 09:17:36 AM',1);", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
});
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});