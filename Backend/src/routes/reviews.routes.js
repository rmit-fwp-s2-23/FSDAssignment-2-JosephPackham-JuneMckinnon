module.exports = (express, app) => {
  const controller = require("../controllers/reviews.controller.js");
  const router = express.Router();

  // Select all posts.
  router.get("/", controller.all);

  // Create a new post.
  router.post("/", controller.create);

  //select a review by movie name
  router.get("/:movie", controller.one);

  //delete a review from the database
  router.delete("/:id", controller.delete);

  //update a review in the database
  router.put("/:id", controller.update);


  

  // Add routes to server.
  app.use("/api/reviews", router);
};
