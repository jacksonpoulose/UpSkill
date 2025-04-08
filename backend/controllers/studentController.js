const getDashboard = (req,res)=>{
    try{
        res.status(200).json({message:"welcome to student dashboard"})
    }catch(error){
        console.log(error);
        res.status(404).json({message:"page not found"})
    }
  
}

module.exports = {getDashboard}