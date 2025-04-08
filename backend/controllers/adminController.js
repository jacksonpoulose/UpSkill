
const getDashboard = (req,res)=>{
    try{
        res.status(200).json({message:"welcome to admin dashboard"})
    }catch(error){
        console.log(error);
        res.status(404).json({message:"page not found"})
    }
  
}

const getCourses = (req,res)=>{
    try{
        res.status(200).json({message:"welcome to Courses"})
    }catch(error){
        console.log(error);
        res.status(404).json({message:"page not found"})
    }
  
}

const getStudents = (req,res)=>{
    try{
        res.status(200).json({message:"welcome to Students page"})
    }catch(error){
        console.log(error);
        res.status(404).json({message:"page not found"})
    }
  
}

const getMentors = (req,res)=>{
    try{
        res.status(200).json({message:"welcome to Mentors page"})
    }catch(error){
        console.log(error);
        res.status(404).json({message:"page not found"})
    }
  
}

module.exports = {getDashboard,
    getCourses,
    getStudents,
    getMentors
}