const fastify = require("fastify")();
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
    console.log(`Server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
