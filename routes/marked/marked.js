const express = require("express");
const router = express.Router();
const Attendance = require("../../database/dbattendence");



router.post("/", (req, res)=>{
    if(req.session.userid){

        const total = parseInt(req.body.total);
        const attendence = [];
        const temp = [];
        for(let i = 1; i <= Object.keys(req.body).length - 2; i++){
            temp.push(parseInt(Object.keys(req.body)[i-1]));
        }
        for(let j = 1; j<= total; j++){
            if(temp.includes(j)){
                attendence.push(1);
            }else{
                attendence.push(0);
            }
        }
        const mydate = new Date();
        const date = mydate.getDate();
        const month = mydate.toLocaleString('default',{month: 'long'});
        const year = mydate.getFullYear();
    
        Attendance.findOne({date: date, month: month, year: year, class: req.body.class}).then(foundData=>{
            if(!(foundData)){
                const tempData = new Attendance({
                    date: date,
                    month: month,
                    year: year,
                    class: req.body.class,
                    attn: attendence
                });
                tempData.save().then((doc)=>{
                    res.send("<h1>attendance recorded successfully.</h1>");
                }).catch(err=>{
                    res.send("<h1>Some unexpected error took place, unable to record attendance, please try after some time.</h1>");
                });
            }else{
                Attendance.updateOne({date: date, month: month, year: year, class: req.body.class}, {attn: attendence}).then(()=>{
                    res.send("<h1>Your attendance for today has been updated successfully.</h1>");
                }).catch(err=>{
                    res.send("<h1>OOOOOppppppsssssss unable to update your attendance.</h1>")
                });
            }
        }).catch(err=>{
            res.send("<h1>I am seeing some major errors here, please tell rohit about it.</h1>");
        });

    }



});

module.exports = router;