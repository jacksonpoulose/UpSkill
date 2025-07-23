
const User = require("../../models/userModel");

const getCurrentUserProfile = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user ID found" });
    }

    const user = await User.findById(userId).select("name email phone address city state country zipCode gender dateOfBirth");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user profile", error: err.message });
  }
};

const editProfileController = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: No user ID found" });
    }

    const {
      name,
      phone,
      address,
      city,
      state,
      country,
      zipCode,
      gender,
      dateOfBirth,
    } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name,
        phone,
        address,
        city,
        state,
        country,
        zipCode,
        gender,
        dateOfBirth,
      },
      { new: true, runValidators: true, select: "name email phone address city state country zipCode gender dateOfBirth" }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Error updating profile", error: err.message });
  }
};

module.exports = { getCurrentUserProfile,editProfileController };
