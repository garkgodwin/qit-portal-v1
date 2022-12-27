const { ATLAS_URI } = require("../constants/configs");
const options = require("./options");

const connect = (mongoose) => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(ATLAS_URI, options)
    .then((data) => {
      const dbName = data.mongoose.connections[0].name;
      console.log("Server connected with the database: " + dbName);

      // require("../controllers/seed.controller").startSeed();
    })
    .catch((error) => {
      console.log(
        "Server encountered an error while connecting to the database: ",
        error
      );
      process.exit(1);
    });
};

module.exports = { connect };
