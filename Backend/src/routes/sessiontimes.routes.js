module.exports = (express, app) => {
    const controller = require("../controllers/sessiontimes.controller.js");
    const router = express.Router();

    // Select all sessiontimes
    router.get("/", controller.all);

    // Create a new sessiontime
    router.post("/", controller.create);

    //select a sessiontime by movie name
    router.get("/:movie", controller.one);

    //delete a sessiontime from the database
    router.delete("/:id", controller.delete);

    //update a sessiontime in the database
    router.put("/:id", controller.update);

    //select a sessiontime by session time day and movie name
    router.get("/:sessiontime_movie/:sessiontime_day", controller.oneByDay);

    // Add routes to server.
    app.use("/api/sessiontimes", router);

}