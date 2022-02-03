const express=require("express");
const cors = require('cors');

const app=express();
const port=8000;
const connectDB=require('./config/database')
connectDB();
app.use(express.json());
app.use(cors())

app.use("/",require("./routes"));



app.listen(port,function(err){
    if(err){
        console.log("error in running server",err);

    }
    console.log("server is running on port",port);
})