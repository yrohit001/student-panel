const express = require("express");
const router = express.Router();
const {Student} = require("../../database/student");

let message = "none";
const date = new Date();
const year = date.getFullYear();

router.get("/", (req, res)=>{
    if(req.session.userid){
        res.render("entry", {msg: message});
        message = "none";
    }else{
        res.redirect("/");
    }
});

router.post("/", (req, res)=>{
    if(req.session.userid){
        const tempdata = req.body;
        const tempstudent = new Student({
            name: String(tempdata.stdname).toLowerCase(),
            father: String(tempdata.fatname).toLowerCase(),
            mother: String(tempdata.motname).toLowerCase(),
            class: tempdata.class,
            roll: tempdata.roll,
            year: year,
            registration:year+"UM/"+tempdata.class+""+tempdata.roll 
        });
        tempstudent.save().then(()=>{
            console.log(`student ${tempdata.stdname} registered successfully.`);
            message = "student's record successfully added to the database.";
            res.redirect("/entry");
        }).catch(err=>{
            console.log("unable to register student...");
            res.send("<h1>Something went wrong unable to register student</h1>");
        });
    }else{
        res.redirect("/");
    }
});



module.exports = router;