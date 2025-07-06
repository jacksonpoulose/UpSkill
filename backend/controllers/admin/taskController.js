const Course = require('../../models/course/course');
const {CourseWeek,Task} = require('../../models/course/courseWeek');

const getTask = async (req,res)=>{
    
    try{
        const course = await Course.find({})
        const task = await Task.find({});
        const courseweek = await CourseWeek.find({});
        res.status(200).json({message:"welcome to get task",course,task,courseweek})
    }catch(error){
        console.log(error);
        res.status(404).json({message:"page not found"})
    }
}
const createCourseWeekWithTasks = async (req, res) => {
    try {
      const {
        course,
        weekNumber,
        title,
        objectives,
        tasks,
        reviewNotes
      } = req.body;
  
      const newCourseWeek = new CourseWeek({
        course,
        weekNumber,
        title,
        objectives,
        tasks, // embedded tasks array
        reviewNotes
      });
  
      const savedWeek = await newCourseWeek.save();
  
      res.status(201).json({
        message: 'CourseWeek created with tasks',
        courseWeek: savedWeek
      });
    } catch (err) {
      console.error('Error creating course week:', err);
      res.status(500).json({ error: 'Server error' });
    }
  };

  
const postEditTask = (req,res)=>{
    try{
        res.status(200).json({message:"welcome to edit task"})
    }catch(error){
        console.log(error);
        res.status(404).json({message:"page not found"})
    }
  
}
const postDeleteTask = async (req,res)=>{
    try{
        const {id} = req.params;
        const task = await Task.findByIdAndDelete(id);
        res.status(200).json({message:"welcome to delete task"})
    }catch(error){
        console.log(error);
        res.status(404).json({message:"page not found"})
    }
  
}
const getIndividualTask = async (req,res)=>{
    try{
        const {id} = req.params;
        const task = await Task.findById(id);
        res.status(200).json({message:"welcome to individual task",task})
    }catch(error){
        console.log(error);
        res.status(404).json({message:"page not found"})
    }
  
}

module.exports = {
    getTask,
    createCourseWeekWithTasks,
    postEditTask,
    postDeleteTask,
    getIndividualTask
}