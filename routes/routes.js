const express = require("express");
const homeroute = require('./home/home');
const entryroute = require('./entry/entry');
const filterroute = require("./attendence/attendence");
const markedroute = require("./marked/marked");
const sturecroute = require("./sturec/sturec");
const clsrecroute = require("./clsrec/clsrec");
const postresrouter = require("./postres/postres");

module.exports = function(app){
    app.use(express.json());
    app.use("/", homeroute);
    app.use("/entry", entryroute);
    app.use("/attendence", filterroute);
    app.use("/marked", markedroute);
    app.use("/sturec", sturecroute);
    app.use("/clsrec", clsrecroute);
    app.use("/postres", postresrouter);
}