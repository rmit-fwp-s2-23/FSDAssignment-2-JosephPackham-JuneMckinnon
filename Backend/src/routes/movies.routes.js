module.exports = (express, app) => {
    const controller = require("../controllers/movies.controller.js");
    const router = express.Router();

    // Select all movies
    router.get("/", controller.all);

    // Create a new movie
    router.post("/", controller.create);

    //select a movie by movie name
    router.get("/:movie_name", controller.one);

    //select a movie by movie id
    router.get("/:movie_id", controller.oneById);

    //delete a movie from the database
    router.delete("/:id", controller.delete);

    //update a movie in the database
    router.put("/:id", controller.update);

    // Add routes to server.
    app.use("/api/movies", router);
}