const Course = require('../../models/course/course');
const {CourseWeek} = require('../../models/course/courseWeek');

const getTask = async (req,res)=>{
    
    try{
        const course = await Course.find({})
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
        resources, // array of resources
        tasks,
        reviewNotes
      } = req.body;
  
      const newCourseWeek = new CourseWeek({
        course,
        weekNumber,
        title,
        objectives,
        resources, // array of resources
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

  
const postEditCourseWeek = async (req,res)=>{
    const {id} = req.params;
    const {course, weekNumber, title, objectives, resources, tasks, reviewNotes} = req.body;
    try{
        const updatedCourseWeek = await CourseWeek.findByIdAndUpdate(
            id,
            { course, weekNumber, title, objectives, resources, tasks, reviewNotes },
            { new: true }
        );
        res.status(200).json({message:"welcome to edit task"})
    }catch(error){
        console.log(error);
        res.status(404).json({message:"page not found"})
    }
  
}
const postDeleteCourseWeek = async (req,res)=>{
    try{
        const {id} = req.params;
        const deletedCourseWeek = await CourseWeek.findByIdAndDelete(id);
        if (!deletedCourseWeek) {
            return res.status(404).json({ message: 'CourseWeek not found' });
        }
        
        res.status(200).json({message:"welcome to delete task"})
    }catch(error){
        console.log(error);
        res.status(404).json({message:"page not found"})
    }
  
}
const getIndividualCourseWeek = async (req,res)=>{
    try{
        const {id} = req.params;
        const courseWeek = await CourseWeek.findById(id).populate('tasks');
        if (!courseWeek) {
            return res.status(404).json({ message: 'CourseWeek not found' });
        }
        res.status(200).json({message:"welcome to individual task",task})
    }catch(error){
        console.log(error);
        res.status(404).json({message:"page not found"})
    }
  
}

module.exports = {
    getTask,
    createCourseWeekWithTasks,
    postEditCourseWeek,
    postDeleteCourseWeek,
    getIndividualCourseWeek
}