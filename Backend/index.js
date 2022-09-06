const express = require("express")
const db = require("./Model")
const cors = require('cors')

let isLoggedIn = false;
const port = 3000
// Validity Schema
// const Joi = require("@hapi/joi");

const app = express()

var numUsers = 0;
var numDel = 0;

app.use(cors())
app.use(express.json())
app.listen(port, () => {
    console.log("Started server at ", port);
})
app.post("/api/create", (req, res) => {
    const username = req.body.userName;
    const title = req.body.title;
    const text = req.body.text;

    db.query("INSERT INTO Login  VALUES (?,?,?)", [email, password], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
    });
});
app.get("/api/get", (req, res) => {
    db.query("select * from Login",
        (err, result) => {
            if (err) {
                console.log(err);
            }
            res.send(result);
        })
});
app.post("/api/login", (req, res) => {
    const { email, password } = req.body;
    db.query(
        "select * from Login where Login.Email_Id = ? AND Login.Password = ?;",
        [email, password],
        (err, results) => {
            var ret = {
                status: 200,
                description: "User Succesfully logged in!",
                data: results
            };
            if (err) {
                ret.status = 500
                ret.description = err;
            } else if (results.length === 0) {
                ret.status = 400;
                ret.description = err;
            }
            res.send(ret);
        }
    );
});

app.post("/api/user", (req, res) => {
    const { email } = req.body;
    // console.log(req.body);
    db.query("select * from User where User.Email_Id=?;",
        [email],
        (err, results) => {
            console.log("user", email);
            // console.log(results);
            var ret = {
                status: 200,
                description: err,
                data: results
            };
            if (err) {
                ret.status = 500;
            } else if (results.length === 0) {
                res.status = 400;
            }
            res.send(ret);
        });
});



app.post("/api/manager", (req, res) => {
    const { email } = req.body;
    // console.log(req.body);
    db.query("select * from Manager where Manager.Email_Id=?;",
        [email],
        (err, results) => {
            console.log("manager", email);
            // console.log(results);
            var ret = {
                status: 200,
                description: err,
                data: results
            };
            if (err) {
                ret.status = 500;
            } else if (results.length === 0) {
                res.status = 400;
            }
            res.send(ret);
        });
});

app.post("/api/publication", (req, res) => {
    const { publicationId } = req.body;
    db.query("select * from Publication where Publication.Publication_Id=?",
        [publicationId],
        (err, results) => {
            var ret = {
                status: 200,
                description: err,
                data: results
            };
            if (err) {
                ret.status = 500;
            } else if (results.length === 0) {
                res.status = 400;
            }
            res.send(ret);
        });
});

app.post("/api/userSubs", (req, res) => {
    const { email } = req.body;
    db.query(
        "select s.Start_Date, s.Duration, s.Address, p.Publication_Name from subscription as s, user as u, publication as p where u.Email_Id=? and u.Id=s.User_Id and p.Publication_Id=s.Publication_Id;",
        [email],
        (err, results) => {
            var ret = {
                status: 200,
                description: err,
                data: results,
            };
            if (err) {
                ret.status = 500;
            } else if (results.length === 0) {
                res.status = 400;
            }
            res.send(ret);
        }
    );
});

app.post("/api/register", (req, res) => {
    db.query("select count(*) as count from user", (err, results) => {
        console.log(results);
        id = results[0].count;
        const { username, phno, email, password } = req.body;
        db.query("insert into Login values (?, ?)",
            [email, password]
        );
        db.query("insert into User values (?,?,?,?)",
            [id + 1, username, email, phno],
            (err, results) => {
                console.log("Hello", username, id);
                var ret = { userId: id + 1 };
                res.send(ret);
            });
    });
});

app.post("/api/userPub", (req, res) => {
    db.query("select distinct publication.Publication_Id, Publication_Name, Type, Language, Pages, Selling_Price from publication natural join stockInformation;", (err, res1) => {
        var ret = {
            status: 200,
            data: res1,
        };
        if (err) {
            ret.status = 500;
        } else if (res1.length === 0) {
            ret.status = 400;
        }
        res.send(ret);
    });
});

app.post("/api/manUser", (req, res) => {
    db.query("select * from user", (err, res1) => {
        var ret = {
            status: 200,
            data: res1,
        };
        if (err) {
            ret.status = 500;
        } else if (res1.length === 0) {
            ret.status = 400;
        }
        res.send(ret);
    });
});

app.post("/api/subscribe", (req, res) => {
    console.log("subscribe", req.body);
    db.query("select count(*) as count from subscription", (err1, res1) => {
        console.log(res1.body);
        sub_id = res1[0].count + 1;
        const { address, startDate, userEmail, duration, publicationId } = req.body;
        db.query(
            "select Id from User where User.Email_Id=?",
            [userEmail],
            (err2, res2) => {
                console.log(res2);
                user_id = res2[0].Id;
                console.log(sub_id, address, startDate, duration, user_id, 1, publicationId);
                db.query("insert into Subscription values (?,?,?,?,?,?,?)", [sub_id, address, startDate, duration, user_id, 1, publicationId],
                    (err3, res3) => {
                        var ret = { status: 200 }
                        if (err3) {
                            ret.status = 400;
                        }
                        res.send(ret);
                    });
                console.log(user_id);

            }
        );
    });
});