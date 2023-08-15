const express = require('express');
const router = express.Router();
const session = require("express-session");

router.get("/", (req, res)=>{
    if(req.session.userid){
        res.redirect("/entry");
    }else{
        res.render("home");
    }
});

router.post("/", (req, res)=>{
    const usrcode = req.body.passcode;
    if(usrcode === process.env.SUPERUSER){
        req.session.userid = true;
        res.redirect("/");
    }else{
        res.send("<h1>invalid passcode.</h1>");
    }
})

module.exports = router;