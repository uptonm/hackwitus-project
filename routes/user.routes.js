const controller = require("../controllers/user.controller");

module.exports = app => {
  app.get("/users/:id", controller.get);
  app.post("/users", controller.post);
};
