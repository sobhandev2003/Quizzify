import express from 'express';
const Route=express.Router();


Route.route("/").get((req,res)=>{
res.json({message:"Get Users"})
})

export default Route;