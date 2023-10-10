module.exports = (express, app) => {
  const controller = require("../controllers/user.controller.js");
  const router = express.Router();

  // Select all users.
  router.get("/", controller.all);

  // Select a single user with id.
  router.get("/select/:id", controller.one);

  // Update user details
  router.put("/update", controller.update);

  //select user from database if email and password match
  router.get("/login", controller.login);

  // Create a new user.
  router.post("/", controller.create);

  // Add routes to server.
  app.use("/api/users", router);
};
