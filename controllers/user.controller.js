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
  const exists = await User.findOne({ email: req.body.email });
  if (!exists) {
    const user = await new User(req.body).save();
    return res.status(200).send({ user });
  } else {
    return res.send({ error: "User exists" });
  }
};

exports.put = async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const exists = await User.findById(req.params.id);
    if (exists) {
      await User.findByIdAndUpdate(req.params.id, req.body);
      return res.status(200).send({ update: req.body });
    } else {
      return res.status(404).send({ error: "User not found" });
    }
  } else {
    return res.status(400).send({ error: "Id not valid" });
  }
};

exports.delete = async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    const exists = await User.findById(req.params.id);
    if (exists) {
      await User.findByIdAndDelete(req.params.id);
      return res.status(200).send({ deleted: req.params.id });
    } else {
      return res.status(404).send({ error: "User not found" });
    }
  } else {
    return res.status(400).send({ error: "Id not valid" });
  }
};
