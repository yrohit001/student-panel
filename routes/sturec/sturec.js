const express = require("express");
const router = express.Router();
const { Student } = require("../../database/student");
const Attendance = require("../../database/dbattendence");

router.get("/", (req, res)=>{
    if(req.session.userid){
        res.render("sturec");
    }else{
        res.redirect("/");
    }
});

router.post("/", (req, res)=>{
    if(req.session.userid){
        const myyear = parseInt(req.body.year);
        if(Object.keys(req.body).length <= 1){
            Student.findOne({registration: req.body.reg}).then((foundrec)=>{
                if(foundrec){
                    const foundrecord = foundrec;
                    Attendance.find({class:foundrec.class, year:foundrec.year || year:foundrec.year+1}).then(attnrec=>{
                        let sturecarr = [foundrecord.name, foundrecord.class, foundrecord.roll];
                        let janarr = [], febarr = [], mararr = [], aprarr=[], mayarr=[], jularr = [], augarr = [], separr = [], octarr = [], novarr = [], decarr = [];
                        let janattn = [], febattn = [], marattn = [], aprattn=[], mayattn=[], julattn = [], augattn = [], sepattn = [], octattn = [], novattn = [], decattn = [];
                        
                        attnrec.forEach(el=>{
                            if(el['month'] === 'January'){
                                janarr.push(el['date']);
                                janattn.push(el['attn'][parseInt(sturecarr[2]-1)]);
                            }else if(el['month'] === 'February'){
                                febarr.push(el['date']);
                                febattn.push(el['attn'][parseInt(sturecarr[2]-1)]);
                            }else if(el['month'] === 'March'){
                                mararr.push(el['date']);
                                marattn.push(el['attn'][parseInt(sturecarr[2]-1)]);
                            }else if(el['month'] === 'April'){
                                aprarr.push(el['date']);
                                aprattn.push(el['attn'][parseInt(sturecarr[2]-1)]);
                            }else if(el['month'] === 'May'){
                                mayarr.push(el['date']);
                                mayattn.push(el['attn'][parseInt(sturecarr[2]-1)]);
                            }else if(el['month'] === 'July'){
                                jularr.push(el['date']);
                                julattn.push(el['attn'][parseInt(sturecarr[2]-1)]);
                            }else if(el['month'] === 'August'){
                                augarr.push(el['date']);
                                augattn.push(el['attn'][parseInt(sturecarr[2]-1)]);
                            }else if(el['month'] === 'September'){
                                separr.push(el['date']);
                                sepattn.push(el['attn'][parseInt(sturecarr[2]-1)]);
                            }else if(el['month'] === 'October'){
                                octarr.push(el['date']);
                                octattn.push(el['attn'][parseInt(sturecarr[2]-1)]);
                            }else if(el['month'] === 'November'){
                                novarr.push(el['date']);
                                novattn.push(el['attn'][parseInt(sturecarr[2]-1)]);
                            }else if(el['month'] === 'December'){
                                decarr.push(el['date']);
                                decattn.push(el['attn'][parseInt(sturecarr[2]-1)]);
                            }
                        });
                        res.render("record",{sturecarr: sturecarr, jan: [janarr, janattn], feb: [febarr, febattn], mar: [mararr, marattn], apr: [aprarr, aprattn], may: [mayarr, mayattn], jul: [jularr, julattn], aug: [augarr, augattn], sep: [separr, sepattn], oct: [octarr, octattn], nov: [novarr, novattn], dec: [decarr, decattn], year: foundrec.year});
                    });
                }else{
                    res.send("<h1>Record Not Found!</h1>");
                }
                   
            });
        }else{
            const reg = req.body.year+"UM/"+req.body.class+""+req.body.roll;
            Student.findOne({class: req.body.class, roll: req.body.roll, year: req.body.year }).then((foundrec)=>{
                if(foundrec){
                    const foundrecord = foundrec;
                    Attendance.find({class:foundrec.class, year:foundrec.year}).then(attnrec=>{
                        let sturecarr = [foundrecord.name, foundrecord.class, foundrecord.roll];
                        let janarr = [], febarr = [], mararr = [], aprarr=[], mayarr=[], jularr = [], augarr = [], separr = [], octarr = [], novarr = [], decarr = [];
                        let janattn = [], febattn = [], marattn = [], aprattn=[], mayattn=[], julattn = [], augattn = [], sepattn = [], octattn = [], novattn = [], decattn = [];
                        
                        attnrec.forEach(el=>{
                            if(el['month'] === 'January'){
                                janarr.push(el['date']);
                                janattn.push(el['attn'][parseInt(sturecarr[2]-1)]);
                            }else if(el['month'] === 'February'){
                                febarr.push(el['date']);
                                febattn.push(el['attn'][parseInt(sturecarr[2]-1)]);
                            }else if(el['month'] === 'March'){
                                mararr.push(el['date']);
                                marattn.push(el['attn'][parseInt(sturecarr[2]-1)]);
                            }else if(el['month'] === 'April'){
                                aprarr.push(el['date']);
                                aprattn.push(el['attn'][parseInt(sturecarr[2]-1)]);
                            }else if(el['month'] === 'May'){
                                mayarr.push(el['date']);
                                mayattn.push(el['attn'][parseInt(sturecarr[2]-1)]);
                            }else if(el['month'] === 'July'){
                                jularr.push(el['date']);
                                julattn.push(el['attn'][parseInt(sturecarr[2]-1)]);
                            }else if(el['month'] === 'August'){
                                augarr.push(el['date']);
                                augattn.push(el['attn'][parseInt(sturecarr[2]-1)]);
                            }else if(el['month'] === 'September'){
                                separr.push(el['date']);
                                sepattn.push(el['attn'][parseInt(sturecarr[2]-1)]);
                            }else if(el['month'] === 'October'){
                                octarr.push(el['date']);
                                octattn.push(el['attn'][parseInt(sturecarr[2]-1)]);
                            }else if(el['month'] === 'November'){
                                novarr.push(el['date']);
                                novattn.push(el['attn'][parseInt(sturecarr[2]-1)]);
                            }else if(el['month'] === 'December'){
                                decarr.push(el['date']);
                                decattn.push(el['attn'][parseInt(sturecarr[2]-1)]);
                            }
                        });
                        res.render("record",{sturecarr: sturecarr, jan: [janarr, janattn], feb: [febarr, febattn], mar: [mararr, marattn], apr: [aprarr, aprattn], may: [mayarr, mayattn], jul: [jularr, julattn], aug: [augarr, augattn], sep: [separr, sepattn], oct: [octarr, octattn], nov: [novarr, novattn], dec: [decarr, decattn], year: req.body.year});
                    });
                }else{
                    res.send("<h1>Record Not Found!</h1>");
                }
                 
            });
        }
    }else{
        res.redirect("/");
    }

});


module.exports = router;
