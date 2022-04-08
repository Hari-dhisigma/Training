exports.handler = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    let id = event.id;
    const sql = "SELECT t.id,u.txtUsername,t.txtOrderNo,t.txtOrderAmount,u.txtAddress,u.txtPincode FROM tblOrderHdr t JOIN tblUsers u on t.refUser=u.id WHERE t.id="+id
    connection.query(sql, function (err, result) {
        if (err) throw err;
        callback(null,{status:"success",value:result})
      });
    };