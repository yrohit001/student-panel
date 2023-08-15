const express = require("express");
const router = express.Router();
const result = require("../../database/result");
const Result = require("../../database/result");

router.post("/", (req, res)=>{
    if(req.session.userid){
        const mydb = req.body.dbdata.split("#");
        Result.findOne({class: mydb[3], subject: mydb[5], testname: mydb[4], year: mydb[2]}).then(foundresult=>{
            if(!foundresult){
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
                        res.send("<h1>marks saved sucessfully</h1>");
                    }else{
                        res.send("unable to save score, please try again!");
                    }
                }).catch(err=>{
                    console.log(err);
                    res.send("<h1>something went wrong, please try again");
                });
            }else{
                Result.updateOne({class: mydb[3], subject: mydb[5], testname: mydb[4], year: mydb[2]}, {score:req.body.sco}).then(()=>{
                    res.send("<h1>marks updated successfully</h1>");
                }).catch(err=>{
                    res.send("<h1>unable to update score card</h1>");
                })
            }
        });
    }else{
        res.redirect("/");
    }
});

module.exports = router;