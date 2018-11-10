const mongoose = require("mongoose");
const User = mongoose.model("users");

exports.get = async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const exists = await User.findById(req.params.id);
    if (exists) {
      return res.code(200).send({ exists });
    } else {
      return res.code(404).send({ error: "User not found" });
    }
  }
  return res.code(400).send({ error: "Id not valid" });
};

exports.post = async (req, res) => {
  const user = await new User(req.body).save();
  return res.code(200).send({ user });
};
