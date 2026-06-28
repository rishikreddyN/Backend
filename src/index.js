import express from "express"
import {main} from "./db/index.js" 
import dotenv from "dotenv"
import  Mongoose  from "mongoose"
import {app} from "./app.js"
dotenv.config()

// console.log("INDEX.JS IS RUNNING");
main()
.then(
    ()=>{
        console.log("DATABASE IS CONNECTED ")
    app.listen(process.env.PORT,()=>{
        console.log(`Server is listerning on the ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("DATABASE FAILED TO CONNECT",err);
})
app.get("/",(req,res)=>{
    res.send("hello")
})
