import express from "express"
import {main} from "./db/index.js" 
import dotenv from "dotenv"
import  Mongoose  from "mongoose"
dotenv.config({
    path:"../.env"
})
const app=express()

main()
app.get("/",(req,res)=>{
    res.send("hello")
})
app.listen(process.env.PORT,()=>{
    console.log(`Port is listening at ${process.env.PORT}`)
})