import{ Request, Response, json } from 'express';

const express =require("express");
const app=express();
const cors=require('cors');
const p= require("./db")
//middleware
app.use(cors());
app.use(express.json()); // req.body

//ROUTES//
//create an issue
app.post("/addissue",async(req:Request,res:Response)=>{
    try {
        const {description} =req.body;
        const newTodo= await p.query("INSERT INTO issues(description) VALUES($1) RETURNING *",[description]);
        
        res.json(newTodo.rows[0])
    } catch (error:any) {
        console.log(error.message);
        
    }

})
//get all issues
app.get("/issues", async(req:Request,res: Response)=>{
    try {
        const allTodos= await p.query("SELECT * FROM issues");
        res.json(allTodos.rows)
    } catch (error:any) {
        console.log(error.message);
        
    }
})
//get an issue
app.get("/issues/:id" ,async(req:Request,res:Response)=>{
    try {
        const{id} =req.params;
        const todo=await p.query("SELECT * FROM issues WHERE $1 = issues.todo_id", [id])
        res.json(todo.rows);
    } catch (error:any) {
        console.log(error.message);
        
    }
})
//update an issue
app.put("/issues/:id", async(req:Request,res:Response)=>{
   
    try {
        const{id}=req.params;
        const {description}= req.body;
        const updateTodo= await p.query("UPDATE issues SET description =$1 WHERE todo_id =$2 ", [description, id]);
        res.json("Todo list is updated!")
    } catch (error:any) {
        console.log(error.message);
    }
})
//remove an issue
app.delete("/issues/:id",async (req:Request,res : Response) => {
    try {
        const {id}= req.params;
        const deleteTodo= await p.query("DELETE FROM issues WHERE todo_id= $1", [id])
        res.json("The selected issue is deleted!")
    } catch (error:any) {
        console.log(error.message);
        
        
    }
    
})

app.listen(8000,()=>{
    console.log("server has started on port 8000");
    
})