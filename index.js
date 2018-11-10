const fastify = require("fastify")({
  logger: {
    prettyPrint: true
  }
});
fastify.register(require("fastify-formbody"));
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(
  process.env.DBURI,
  { useNewUrlParser: true }
);

require("./models/user");
require("./routes/user.routes")(fastify);

const PORT = process.env.PORT || 8000;

// Run the server!
const start = async () => {
  try {
    await fastify.listen(PORT);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
