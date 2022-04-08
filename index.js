const express = require('express')
const app = express()
const port = 3000


// var bodyParser = require('body-parser')
// var jsonParser = bodyParser.json()
// var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.json());

var mysql = require('mysql');

var con = mysql.createConnection({
  host: 'ecommerce.c56ayiprrn3s.us-west-2.rds.amazonaws.com',
  user: 'admin',
  password: '12345678',
  database: 'ecommerce'
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});


//Signup API for country fetch
app.get('/countryfetch', function (req, res) {
  con.query("SELECT id,txtCountryname FROM tblCountry;", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    // res.send(result);
    res.json({ status: 'success', values: result })
  });
});


//Signup API for state fetch
app.get('/statefetch', (req, res) => {
  let countryId = req.body.countryid;

  let sql = "SELECT c.id, c.txtCountryname, s.id, s.txtStatename, s.refCountryName FROM tblCountry c JOIN tblState s ON s.refCountryName = c.id WHERE c.id =" + countryId;


  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    // res.send(result);
    res.json({ status: 'success', values: result })
  });
});


//Signup API for user insert
app.post('/userinsert', function (req, res) {

  // let userid = req.body.userid;
  let usertype = req.body.txtUserType;
  if (usertype == '') {
    res.send({ status: 'error', "message": "usertype is empty" })
    return;
  }

  let username = req.body.txtUsername;
  if (username == '') {
    res.send({ status: 'error', "message": "username is empty" })
    return;
  }

  // con.query("SELECT txtUsername FROM tblusers WHERE txtUsername = '"+ username +"'", function(err, result, field){
  //   if(result.length != 0){
  //     res.send({ status: 'error', "message":"username already exist"});  
  //   }
  //   });



  let password = req.body.txtPassword;
  if (password == '') {
    res.send({ status: 'error', "message": "password is empty" })
    return;
  }

  let firstname = req.body.txtFirstname;
  if (firstname == '') {
    res.send({ status: 'error', "message": "firstname is empty" })
    return;
  }

  let lastname = req.body.txtLastname;
  if (lastname == '') {
    res.send({ status: 'error', "message": "lastname  is empty" })
    return;
  }

  let country = req.body.refCountry;
  let state = req.body.refState;
  let address = req.body.txtAddress;
  let street = req.body.txtStreet;
  let city = req.body.txtCity;
  let pincode = req.body.txtPincode;
  let phoneno = req.body.txtPhoneNo;
  if (phoneno == '') {
    res.send({ status: 'error', "message": "phoneno is empty" })
    return;
  }

  let website = req.body.txtWebsite;
  let isregistered = req.body.bISRegistered;
  if (isregistered == '') {
    res.send({ status: 'error', "message": "isregistered  is empty" })
    return;
  }

  let createdon = req.body.dtCreatedOn;
  let updatedon = req.body.dtUpdatedOn;
  let deleteflag = req.body.bDeleteFlag;

  var sql = "INSERT INTO tblusers (refUserType, txtUsername, txtPassword, txtFirstName, txtLastName, refCountry, refState, txtAddress, txtStreet, txtCity, txtPincode, txtPhoneNo, txtWebsite, bIsRegistered, dtCreatedOn, dtUpdatedOn, bDeleteFlag) VALUES (" + usertype + ",'" + username + "','" + password + "','" + firstname + "','" + lastname + "','" + country + "','" + state + "','" + address + "','" + street + "','" + city + "','" + pincode + "','" + phoneno + "','" + website + "'," + isregistered + ",'" + createdon + "','" + updatedon + "'," + deleteflag + ");"
  con.query(sql, function (err, result) {
    if (err)
      res.json({ status: 'error' })
    // console.log("1 record inserted");
    res.json({ status: 'success', values: result })
  });
});


//Login API for user validation
app.get('/uservalidation', function (req, res) {
  let username = req.body.txtUsername
  let password = req.body.txtPassword
  con.query("SELECT  u.txtUsername,u.txtPassword,u.txtFirstName,u.txtLastName,t.txtUserType FROM tblUsers u JOIN tblUserType t ON u.refUserType = t.id WHERE u.txtUsername ='" + username + "' AND u.txtPassword ='" + password + "'", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    // res.send(result);
    res.json({ status: 'success', values: result })
  });
});

// Dashboard API for Order Summary
app.get('/uservalidation', function (req, res) {
  let id = req.body.id
  con.query("SELECT t.id,t.txtOrderNo,t.txtOrderAmount,c.txtQuantity,c.txtTotalAmount from tblOrderHdr t join tblOrderChild c on t.id=c.refOrderHdr where t.id=" + id, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.json({ status: 'success', values: result })
  });
});


// //Login API for changing password
// app.patch('/changingpassword', (req, res) => {
//   var sql = "UPDATE tblUsers  SET txtPassword = '321' WHERE id = 1;";
//   con.query(sql, function (err, result) {
//     if (err) throw err;
//     console.log(result.affectedRows + " record(s) updated");
//   });
// });


//ProductList API for fetching products
app.get('/productfetch', (req, res) => {
  con.query("SELECT p.txtProdName, p.txtProdPrice, t.txtCategoryName FROM tblProduct p JOIN  tblProductCategory t ON p.refProdCategory = t.id", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send({ status: "success", values: result });
  });
});


//Add Product API for inserting products
app.post('/productinsert', (req, res) => {
  let productname = req.body.txtProdName
  if (productname == '') {
    res.send({ status: "error", message: "productname is empty" });
  }
  let productprice = req.body.txtProdPrice
  if (productprice == '') {
    res.send({ status: "error", message: "productprice is empty" });
  }
  let ProdCategory = req.body.refProdCategory
  if (ProdCategory == '') {
    res.send({ status: "error", message: "ProdCategory is empty" });
  }
  let CreatedOn = req.body.dtCreatedOn
  let UpdatedOn = req.body.dtUpdatedOn
  let DeleteFlag = req.body.bDeleteFlag
  var sql = "INSERT INTO tblProduct (txtProdName,txtProdPrice,refProdCategory,dtCreatedOn,dtUpdatedOn,bDeleteFlag) VALUES ('" + productname + "','" + productprice + "','" + ProdCategory + "','" + CreatedOn + "','" + UpdatedOn + "','" + DeleteFlag + "');";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    res.send({ status: "success", value: result })
  });
});


//Edit Product  API for updating product
app.patch('/productupdate', (req, res) => {
  let pid = req.body.id;
  let ProdName = req.body.txtProdName;
  let ProdPrice = req.body.txtProdPrice;
  let CreatedOn = req.body.dtCreatedOn;
  let UpdatedOn = req.body.dtUpdatedOn;
  let DeleteFlag = req.body.bDeleteFlag;
  var sql = "UPDATE tblProduct SET txtProdName = '" + ProdName + "', txtProdPrice = '" + ProdPrice + "', dtCreatedOn = '" + CreatedOn + "', dtUpdatedOn = '" + UpdatedOn + "', bDeleteFlag = '" + DeleteFlag + "' WHERE id='" + pid + "'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
    res.send({ status: "success", values: result });
  });
});


//OrderList API for inserting orders
app.post('/orderinsert', (req, res) => {
  var sql = "INSERT INTO tblOrderHdr VALUES ('1211','7000','20220211 10:40:09 AM','20220331 11:19:09 AM',1), ('','1212','2000','20220115 13:40:09 PM','20220330 15:19:09 PM',1);";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
});


//OrderList API for fetching orders
app.get('/orderfetch', (req, res) => {
  con.query("SELECT to.id, u.refUser, u.txtUsername, u.txtAddress, to.txtOrderNo, to.txtOrderAmount, to.dtCreatedOn, to.dtUpdatedOn, to.bDeleteFlag FROM tblOrderHdr to tblusers u ON u.refUser=to.id WHERE id = 1;", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});


//OrderEdit API for updating order
app.patch('/orderupdate', (req, res) => {
  var sql = "UPDATE tblOrderHdr SET txtOrderNo = '', txtOrderAmount = '', dtCreatedOn = '', dtUpdatedOn = '', bDeleteFlag = '' WHERE id = 1;";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
  });
});


//ProfileEdit API for updating users
app.patch('/userupdate', (req, res) => {
  let id = req.body.id;
  let txtPassword = req.body.txtPassword;
  let txtFirstname = req.body.txtFirstname;
  let txtLastname = req.body.txtLastname;
  let txtAddress = req.body.txtAddress;
  var sql = "UPDATE tblUsers SET txtPassword ='" + txtPassword + "', txtFirstname ='" + txtFirstname + "', txtLastname ='" + txtLastname + "',txtAddress ='" + txtAddress + "' WHERE id = '" + id + "';";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
    res.send({ status: "success", values: result });
  });
});



// API For selectuserbyid
app.get('/selectuserbyid', (req, res) => {
  let id = req.body.id;
  let txtUsername = req.body.txtUsername;
  let txtFirstname = req.body.txtFirstname;
  let txtLastname = req.body.txtLastname;
  let txtPassword = req.body.txtPassword;
  let txtAddress = req.body.txtAddress;
  let txtCity = req.body.txtCity;
  let txtStreet = req.body.txtStreet;
  let txtPincode = req.body.txtPincode;
  let txtPhoneNo = req.body.txtPhoneNo;
  let txtWebsite = req.body.txtWebsite;
  con.query("UPDATE tblUsers SET txtUsername ='" + txtUsername + "',txtPassword='" + txtPassword + "',txtFirstname='" + txtFirstname + "',txtLastname='" + txtLastname + "',txtAddress='" + txtAddress + "',txtStreet='" + txtStreet + "',txtCity='" + txtCity + "',txtPincode='" + txtPincode + "',txtPhoneNo='" + txtPhoneNo + "',txtWebsite='" + txtWebsite + "' WHERE id='" + id + "';", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send({ status: "success", values: result });
  });
});




app.listen(port, () => {
  console.log(`app listening on port ${port}`)
});
module.exports = app;