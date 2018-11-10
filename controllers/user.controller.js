const mongoose = require("mongoose");
const User = mongoose.model("users");

exports.get = async (req, res) => {
  // Check if request is valid
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    // if Valid check if user exists
    const exists = await User.findById(req.params.id);
    if (exists) {
      // Return user
      return { exists };
    } else {
      // Return user doesnt exist
      return { error: "User not found" };
    }
  }
  // Return id not valid
  return { error: "Id not valid" };
};
