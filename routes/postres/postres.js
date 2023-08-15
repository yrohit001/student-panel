const express = require("express");
const router = express.Router();
const result = require("../../database/result");
const Result = require("../../database/result");

router.post("/", (req, res)=>{
    if(req.session.userid){
        const mydb = req.body.dbdata.split("-");
        const tempres = new Result({
            date: mydb[0],
            month: mydb[1],
            year: mydb[2],
            class: mydb[3],
            testname: mydb[4],
            subject: mydb[5],
            maxsco: mydb[6],
            score: req.body.sco
        });
        console.log(tempres);
        tempres.save().then(savedItem=>{
            if(savedItem){
                res.send("marks saved sucessfully");
            }else{
                res.send("unable to save score, please try again!");
            }
        }).catch(err=>{
            console.log(err);
            res.send("<h1>something went wrong, please try again");
        });
    }else{
        res.redirect("/");
    }
});

module.exports = router;