const express=require("express");
const cors = require('cors');

const app=express();
const port=8000;
const connectDB=require('./config/database')
const passport=require("passport");
const passportJwt=require("./config/passport-jwt-strategy");

connectDB();
app.use(express.json());
app.use(cors())
app.use(passport.initialize());

app.use("/upload",express.static(__dirname+"/upload"));

app.use("/",require("./routes"));



app.listen(port,function(err){
    if(err){
        console.log("error in running server",err);

    }
    console.log("server is running on port",port);
})