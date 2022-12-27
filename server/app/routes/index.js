module.exports = (app) => {
  app.get("/api/v1", (req, res) => {
    res.send({ message: "Welcome to the API version 1.0" });
  });
  require("./auth.routes")(app); // login, first login, and authenticate
  require("./general.routes")(app); // get room and subjects
  require("./user.routes")(app); // get users and stuff
  require("./staff.routes")(app); // staff and instructor actions
  require("./student.routes")(app); // student actions
  require("./notification.routes")(app); // notification actions
  require("./school.routes")(app); // school actions
};
