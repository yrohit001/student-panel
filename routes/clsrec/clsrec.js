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
                Result.findOne({class: req.body.class, subject: String(req.body.subject).toLowerCase(), testname: String(req.body.testname).toLowerCase(), year: req.body.year}).then(foundresult=>{
                    if(!foundresult){
                        Student.find({class: req.body.class, year: req.body.year}).then((foundstd)=>{
                            if(foundstd.length>0){
                                const stdarr = [];
                                const rollarr = [];
                                const numarr = [];
                                foundstd.forEach(el=>{
                                    rollarr.push(el['roll']);
                                    stdarr.push(el['name']);
                                    numarr.push(-5);
                                });
                                res.render("result", {data:[rollarr, stdarr], date: mydate, month: mymonth, year: myyear, cls: req.body.class, testname: String(req.body.testname).toLowerCase(), subject: String(req.body.subject).toLowerCase(), maxsco: req.body.maxscore, numarr: numarr});
                            }else{
                                res.send("<h1>record not found!</h1>")
                            }
                        });
                    }else{
                        Student.find({class: req.body.class, year: req.body.year}).then(foundstd=>{
                            if(foundstd.length>0){
                                const fdate = foundresult.date;
                                const fmonth = foundresult.month;
                                const fyear = foundresult.year;
                                const numarr = foundresult.score;
                                const fcls = foundresult.class;
                                const ftestname = foundresult.testname;
                                const fsubject = foundresult.subject;
                                const fmaxsco = foundresult.maxsco;
                                const stdarr = [];
                                const rollarr = [];
                                foundstd.forEach(el=>{
                                    rollarr.push(el['roll']);
                                    stdarr.push(el['name']);
                                });
                                res.render("result", {data:[rollarr, stdarr], date: fdate, month: fmonth, year: fyear, cls: fcls, testname: ftestname, subject: fsubject, maxsco: fmaxsco, numarr: numarr});
                            }else{
                                res.send("<h1>Record not found!</h1>");
                            }
                        }).catch(err=>{
                            res.send("<h1>Unable to read existing result, contact developer.</h1>");
                        })
                    }
                }).catch(err=>{
                    res.send("<h1>Something went wrong, please try again.</h1>");
                });
            }else{
                Result.findOne({class: req.body.class, subject: String(req.body.subject).toLowerCase(), testname: String(req.body.test).toLowerCase(), year: req.body.year}).then(foundresult=>{
                    if(!foundresult){
                        Student.find({class: req.body.class, year: req.body.year}).then((foundstd)=>{
                            if(foundstd.length>0){
                                const stdarr = [];
                                const rollarr = [];
                                const numarr = [];
                                foundstd.forEach(el=>{
                                    rollarr.push(el['roll']);
                                    stdarr.push(el['name']);
                                    numarr.push(-5);
                                });
                                res.render("result", {data:[rollarr, stdarr], date: mydate, month: mymonth, year: myyear, cls: req.body.class, testname: String(req.body.test).toLowerCase(), subject: String(req.body.subject).toLowerCase(), maxsco: req.body.maxscore, numarr: numarr});
                            }else{
                                res.send("<h1>record not found!</h1>")
                            }
                        });
                    }else{
                        Student.find({class: req.body.class, year: req.body.year}).then(foundstd=>{
                            if(foundstd.length>0){
                                const fdate = foundresult.date;
                                const fmonth = foundresult.month;
                                const fyear = foundresult.year;
                                const numarr = foundresult.score;
                                const fcls = foundresult.class;
                                const ftestname = foundresult.testname;
                                const fsubject = foundresult.subject;
                                const fmaxsco = foundresult.maxsco;
                                const stdarr = [];
                                const rollarr = [];
                                foundstd.forEach(el=>{
                                    rollarr.push(el['roll']);
                                    stdarr.push(el['name']);
                                });
                                res.render("result", {data:[rollarr, stdarr], date: fdate, month: fmonth, year: fyear, cls: fcls, testname: ftestname, subject: fsubject, maxsco: fmaxsco, numarr: numarr});
                            }else{
                                res.send("<h1>Record not found!</h1>");
                            }
                        }).catch(err=>{
                            res.send("<h1>Unable to read existing result, contact developer.</h1>");
                        })
                    }
                }).catch(err=>{
                    res.send("<h1>Something went wrong, please try again.</h1>");
                });
            }
        }else{
            Result.find({class: req.body.class, year: req.body.year, subject:String(req.body.subject).toLowerCase()}).then(sftres=>{
                if(sftres.length>0){
                    const clsarr = [];
                    const subarr = [];
                    const tstnamearr = [];
                    const tstarr = [];
                    const yerarr = [];
                    const datearr = [];
                    const maxscoarr = [];
                    sftres.forEach(el=>{
                        clsarr.push(el['class']);
                        subarr.push(el['subject']);
                        tstnamearr.push(el['testname']);
                        if(['i', 'ii', 'iii', 'iv', 'half yearly', 'annual'].includes(el['testname']) ){
                            tstarr.push(el['testname']);
                        }else{
                            tstarr.push("custom");
                        }
                        yerarr.push(el['year']);
                        datearr.push(String(el['month'])+" "+String(el['date'])+", "+String(el['year']));
                        maxscoarr.push(el['maxsco']);
                    });
                    const cls = req.body.class;
                    const yr = req.body.year;
                    res.render("searchres", {clsarr: clsarr, subarr: subarr, tstnamearr: tstnamearr, tstarr: tstarr, yerarr: yerarr, cls: cls, yr: yr, datearr:datearr, max: maxscoarr});
                }else{
                    res.send("<h1>No recore found!</h1>");
                }
            }).catch(err=>{
                res.send("<h1>unable to search! something went wrong, contact developer.</h1>");
            })
        }
    }else{
        res.redirect("/");
    }
})

module.exports = router;