import{ Request, Response, json } from 'express';
import issueRoutes from './routes/issueRoutes'; // Ensure the path is correct

const express =require("express");
const app=express();
const cors=require('cors');
const p= require("./db")
//middleware
app.use(cors());
app.use(express.json()); // req.body
app.use(issueRoutes);
app.listen(8000,()=>{
    console.log("server has started on port 8000");
    
})