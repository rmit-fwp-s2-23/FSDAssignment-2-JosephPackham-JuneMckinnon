module.exports = (express, app) => {
    const controller = require("../controllers/sessiontimes.controller.js");
    const router = express.Router();

    //select all session times
    router.get("/", controller.all);

    //select a session time by session time id
    router.get("/id/:id", controller.oneById);

    //select a session time by movie name
    router.get("/movie/:sessiontime_movie", controller.one);

    //select a session time by session time day and movie name
    router.get("/day/:sessiontime_day/:sessiontime_movie", controller.oneByDay);

    //delete a session time by session time id
    router.delete("/:id", controller.delete);

    //update a session time in the database by session time id
    router.put("/:id", controller.update);

    //update available seats in the database by session time id
    router.put("/availableseats/:id", controller.updateAvailableSeats);

    //create a session time
    router.post("/", controller.create);

    

    app.use("/api/sessiontimes", router);



}