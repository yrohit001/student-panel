const express = require("express");
const router = express.Router();
const {Student} = require("../../database/student");
const Attendance = require("../../database/dbattendence");


router.post("/", (req, res)=>{
    if(req.session.userid){
        const cls = req.body.class;
        Student.find({class: cls, year: req.body.year}).then((allFound)=>{
            
            if(allFound.length > 0){
                let alterAttn = [];
                
                const completerecord = [];
                let counter = 0;
                allFound.forEach(el=>{
                    counter += 1;
                    completerecord.push([el.roll, el.name]);
                    alterAttn.push(1);
                });

                const mydate = new Date();
                const date = mydate.getDate();
                const month = mydate.toLocaleString('default',{month: 'long'});
                const year = mydate.getFullYear();

                Attendance.findOne({date: date, month: month, year: year, class: cls}).then(foundrecord=>{
                    if(foundrecord){
                        res.render("attendence", {cls: cls, record: completerecord, total: counter, attn: foundrecord.attn});
                    }else{
                        res.render("attendence", {cls: cls, record: completerecord, total: counter, attn: alterAttn});
                    }
                });

            }else{
                res.send("<h1>record not found!</h1>")
            }
        });

    }else{
        res.redirect("/");
    }
});

module.exports = router;