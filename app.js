require('dotenv').config();
const express = require("express");
const ejs = require("ejs");
const session = require("express-session");
const MongoStore = require("connect-mongo");

//server
const port = process.env.PORT || 3000;
const app = express();
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));

//session
app.set('trust proxy', 1);
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.DATABASE_URI}),
    cookie: {secure: true, maxAge:24*3600*1000}
}));

//routes
require("./routes/routes")(app);

//connection
require("./database/connection")(app, port);

