
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
app.listen(port, () =>{
    console.log("Started server at ",port);
})
app.post("/api/create", (req, res) => {
    const username = req.body.userName;
    const title = req.body.title;
    const text = req.body.text;

    db.query("INSERT INTO Login  VALUES (?,?,?)",[email,password], (err,result)=>{
        if(err) {
            console.log(err)
        } 
        console.log(result)
    });  
});
app.get("/api/get", (req, res) => {
    db.query("select * from Login",
    (err, result) => {
        if (err){
            console.log(err);
        }
        res.send(result);
    })
});
app.post("/api/login", (req, res) => {
    const {email, password} = req.body;
    db.query(
        "select * from Login where Login.Email_Id = ? AND Login.Password = ?;",
        [email, password],
        (err, results) => {
            if (err ){
                console.log(err);
                res.send({
                    status:500,
                    description:err
                })
            }else if (results.length === 0){
                console.log(err);
                res.send({
                    status:400,
                    description:err
                })
            }
            else {
                res.send({
                    status:200,
                    description:"User Logged in succesfully"
                });
            }
            var ret= {
                status:200,
                description:err,
                data:results
            };
            if (err){
                ret.status = 500
            }else if (results.length === 0){
                res.status = 400;
            }
            res.send(ret);
        }
    );
});

app.post("/api/user", (req, res) => {
    const {email} = req.body;
    console.log(req.body);
    db.query("select * from User where User.Email_Id=?;", 
    [email],
    (err, results) =>{
        console.log(email);
        // console.log(results);
        var ret= {
            status:200,
            description:err,
            data:results
        };
        if (err){
            ret.status = 500;
        }else if (results.length === 0){
            res.status = 400;
        }
        res.send(ret); 
    });
});

app.post("/api/publication", (req, res) => {
    const {publicationId} = req.body;
    db.query("select * from Publication where Publication.Publication_Id=?",
    [publicationId],
    (err, results) => {
        var ret= {
            status:200,
            description:err,
            data:results
        };
        if (err){
            ret.status = 500;
        }else if (results.length === 0){
            res.status = 400;
        }
        res.send(ret);
    });
});

app.post("/api/register", (req, res) => {
    numUsers+=1;
    const {username, phno, email, password} = req.body;
    db.query("insert into Login values (?, ?)",
    [email, password]
    );
    db.query("insert into User values (?,?,?,?)",
    [numUsers, username, email, phno],
    (err, results) => {
        var ret = {userId: numUsers};
    });
});