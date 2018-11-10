const controller = require("../controllers/user.controller");

module.exports = fastify => {
  fastify.get("/users/:id", controller.get);
  fastify.post("/users", controller.post);
};
