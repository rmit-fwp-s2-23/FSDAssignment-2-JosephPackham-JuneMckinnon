module.exports = (express, app ) => {
    const controller = require("../controllers/tickets.controller.js");
    const router = express.Router();
    
    // Select all reservations.
    router.get("/", controller.all);
    
    // Create a new reservation.
    router.post("/", controller.create);
    
    //select a ticket by movie name
    router.get("/:movie", controller.one);
    
    //select a ticket by email
    router.get("/:email", controller.email);
    
    //delete a ticket from the database
    router.delete("/:id", controller.delete);
    
    //update a ticket in the database
    router.put("/:id", controller.update);
    
    // Add routes to server.
    app.use("/api/tickets", router);
    }