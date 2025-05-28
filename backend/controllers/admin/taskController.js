const Course = require('../../models/Course');


const postAddTask = (req,res)=>{
    try{
        const { title, description, courseId } = req.body;
        const newTask = new Task({ title, description, courseId });
        newTask.save();
        res.status(200).json({message:"welcome to add task"})
    }catch(error){
        console.log(error);
        res.status(404).json({message:"page not found"})
    }
  
}
const postEditTask = (req,res)=>{
    try{
        res.status(200).json({message:"welcome to edit task"})
    }catch(error){
        console.log(error);
        res.status(404).json({message:"page not found"})
    }
  
}
const postDeleteTask = (req,res)=>{
    try{
        res.status(200).json({message:"welcome to delete task"})
    }catch(error){
        console.log(error);
        res.status(404).json({message:"page not found"})
    }
  
}
const getIndividualTask = (req,res)=>{
    try{
        res.status(200).json({message:"welcome to individual task"})
    }catch(error){
        console.log(error);
        res.status(404).json({message:"page not found"})
    }
  
}