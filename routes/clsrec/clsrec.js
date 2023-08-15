const express = require("express");
const router = express.Router();
const {Student} = require("../../database/student");
const Result = require("../../database/result");

router.get("/", (req, res)=>{
    if(req.session.userid){
        res.render("clsrec");
    }else{
        res.redirect("/");
    }
});

router.post("/", (req, res)=>{
    if(req.session.userid){
        const dd = new Date();
        const mydate = dd.getDate();
        const mymonth = dd.toLocaleString('en-US', {'month': 'long'});
        const myyear = dd.getFullYear();
        if(req.body.test !== "sft"){
            if(req.body.test === "custom"){
                Result.findOne({class: req.body.class, subject: req.body.subject, testname: req.body.testname, year: req.body.year}).then(foundresult=>{
                    if(!foundresult){
                        Student.find({class: req.body.class, year: req.body.year}).then((foundstd)=>{
                            if(foundstd.length>0){
                                const stdarr = [];
                                const rollarr = [];
                                foundstd.forEach(el=>{
                                    rollarr.push(el['roll']);
                                    stdarr.push(el['name']);
                                });
                                res.render("result", {data:[rollarr, stdarr], date: mydate, month: mymonth, year: myyear, cls: req.body.class, testname: String(req.body.testname).toLowerCase(), subject: String(req.body.subject).toLowerCase(), maxsco: req.body.maxscore});
                            }else{
                                res.send("<h1>record not found!</h1>")
                            }
                        });
                    }
                }).catch(err=>{
                    res.send("<h1>Something went wrong, please try again.</h1>");
                });
            }else{
                Result.findOne({class: req.body.class, subject: req.body.subject, testname: req.body.test, year: req.body.year}).then(foundresult=>{
                    if(!foundresult){
                        Student.find({class: req.body.class, year: req.body.year}).then((foundstd)=>{
                            if(foundstd.length>0){
                                const stdarr = [];
                                const rollarr = [];
                                foundstd.forEach(el=>{
                                    rollarr.push(el['roll']);
                                    stdarr.push(el['name']);
                                });
                                res.render("result", {data:[rollarr, stdarr], date: mydate, month: mymonth, year: myyear, cls: req.body.class, testname: String(req.body.test).toLowerCase(), subject: String(req.body.subject).toLowerCase(), maxsco: req.body.maxscore});
                            }else{
                                res.send("<h1>record not found!</h1>")
                            }
                        });
                    }
                }).catch(err=>{
                    res.send("<h1>Something went wrong, please try again.</h1>");
                });
            }
        }
    }else{
        res.redirect("/");
    }
})

module.exports = router;