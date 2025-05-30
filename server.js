require('dotenv').config();
const express = require('express');
const path = require ('path');
const db = require('./config/db');
const app = express();
const session = require('express-session');
const flash = require("connect-flash");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(session({
    secret: 'MyS3CR3T#@!@CGGmn',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(flash());

app.use((req, res, next) => {
    res.locals.success_message = req.flash("success");
    res.locals.error_message = req.flash("error");
    next();
});

// app.use(require('./routing/assignment1.routes'));
// app.use(require('./routing/assignment2.routes'));
// app.use(require('./routing/assignment3.routes'));
// app.use("/api", require('./routing/assignment4.routes'));
// app.use("/api", require('./routing/assignment5.route'));
app.use("/api", require('./routing/studentMarks.routes'));



app.listen(process.env.PORT, async()=>{
    console.log(`server is running on port @ http://localhost:${process.env.PORT}/`);
    await db.Connect();
})