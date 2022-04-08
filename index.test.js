const request = require('supertest');
// const { response } = require('.');
const app = require("./index");

describe("testing user insert", () => {
    test("test with every data inserted", (done) => {
        request(app)
            .post("/userinsert")
            .send({

                "txtUserType": 1,
                "txtUsername": "abhi",
                "txtPassword": "123",
                "txtFirstname": "Abin",
                "txtLastname": "Issac",
                "refCountry": 1,
                "refState": 1,
                "txtAddress": "abc",
                "txtStreet": "dpd",
                "txtCity": "ekm",
                "txtPincode": "683562",
                "txtPhoneNo": "910011277222",
                "txtWebsite": "abintalks.com",
                "bISRegistered": 1,
                "dtCreatedOn": "2022-03-21 10:30:09",
                "dtUpdatedOn": "2022-03-23 11:10:09",
                "bDeleteFlag": 0
            })
            .then((response) => {
                expect(JSON.stringify(response.body)).toBe(JSON.stringify({
                    "status": "success",
                    "values": {
                        "fieldCount": 0,
                        "affectedRows": 1,
                        "insertId": 72,
                        "serverStatus": 2,
                        "warningCount": 0,
                        "message": "",
                        "protocol41": true,
                        "changedRows": 0
                    }
                }));
                done();
            });
    });
});



describe("testing user insert", () => {
    test("test with username empty", (done) => {
        request(app)
            .post("/userinsert")
            .send({

                "txtUserType": 1,
                "txtUsername": "",
                "txtPassword": "123",
                "txtFirstname": "Abin",
                "txtLastname": "Issac",
                "refCountry": 1,
                "refState": 1,
                "txtAddress": "abc",
                "txtStreet": "dpd",
                "txtCity": "ekm",
                "txtPincode": "683562",
                "txtPhoneNo": "910011277222",
                "txtWebsite": "abintalks.com",
                "bISRegistered": 1,
                "dtCreatedOn": "2022-03-21 10:30:09",
                "dtUpdatedOn": "2022-03-23 11:10:09",
                "bDeleteFlag": 0
            })
            .then((response) => {
                expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 'error', "message": "username is empty" }));
                done();
            });
    });
});

describe("testing user insert", () => {
    test("test with password empty", (done) => {
        request(app)
            .post("/userinsert")
            .send({

                "txtUserType": 1,
                "txtUsername": "abhi1",
                "txtPassword": "",
                "txtFirstname": "Abin",
                "txtLastname": "Issac",
                "refCountry": 1,
                "refState": 1,
                "txtAddress": "abc",
                "txtStreet": "dpd",
                "txtCity": "ekm",
                "txtPincode": "683562",
                "txtPhoneNo": "910011277222",
                "txtWebsite": "abintalks.com",
                "bISRegistered": 1,
                "dtCreatedOn": "2022-03-21 10:30:09",
                "dtUpdatedOn": "2022-03-23 11:10:09",
                "bDeleteFlag": 0
            })
            .then((response) => {
                expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 'error', "message": "password is empty" }));
                done();
            });
    });
});


describe("testing user insert", () => {
    test("test with phoneno empty", (done) => {
        request(app)
            .post("/userinsert")
            .send({

                "txtUserType": 1,
                "txtUsername": "abhi2",
                "txtPassword": "123",
                "txtFirstname": "Abin",
                "txtLastname": "Issac",
                "refCountry": 1,
                "refState": 1,
                "txtAddress": "abc",
                "txtStreet": "dpd",
                "txtCity": "ekm",
                "txtPincode": "683562",
                "txtPhoneNo": "",
                "txtWebsite": "abintalks.com",
                "bISRegistered": 1,
                "dtCreatedOn": "2022-03-21 10:30:09",
                "dtUpdatedOn": "2022-03-23 11:10:09",
                "bDeleteFlag": 0
            })
            .then((response) => {
                expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 'error', "message": "phoneno is empty" }));
                done();
            });
    });
});

describe("testing user insert", () => {
    test("test with unique username", (done) => {
        request(app)
            .post("/userinsert")
            .send({

                "txtUserType": 1,
                "txtUsername": "abhi123",
                "txtPassword": "123",
                "txtFirstname": "Abin",
                "txtLastname": "Issac",
                "refCountry": 1,
                "refState": 1,
                "txtAddress": "abc",
                "txtStreet": "dpd",
                "txtCity": "ekm",
                "txtPincode": "683562",
                "txtPhoneNo": "4467863737",
                "txtWebsite": "abintalks.com",
                "bISRegistered": 1,
                "dtCreatedOn": "2022-03-21 10:30:09",
                "dtUpdatedOn": "2022-03-23 11:10:09",
                "bDeleteFlag": 0
            })
            .then((response) => {
                expect(JSON.stringify(response.body)).toBe(JSON.stringify({ status: 'error' }));
                done();
            });
    });
});



