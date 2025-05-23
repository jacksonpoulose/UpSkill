


const getStudents = async (req, res) => {
  try {
    const students = await Users.find({ role: "student" });
    res
      .status(200)
      .json({ message: "welcome to Students page", students });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "page not found" });
  }
};




const getIndividualStudent = async (req, res) => {
  try {
    const { _id } = req.params;
    const student = await Users.findById(_id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json({ message: `Welcome to Student ${_id}`, student });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  getStudents,
  getIndividualStudent,
};