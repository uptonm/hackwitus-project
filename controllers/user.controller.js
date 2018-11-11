const mongoose = require("mongoose");
const User = mongoose.model("users");

exports.get = async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const exists = await User.findById(req.params.id);
    if (exists) {
      return res.status(200).send({ user: exists });
    } else {
      return res.status(404).send({ error: "User not found" });
    }
  }
  return res.status(400).send({ error: "Id not valid" });
};

exports.post = async (req, res) => {
  const user = await new User(req.body).save();
  return res.status(200).send({ user });
};
