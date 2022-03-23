module.exports = app => {
    const event = require("../controllers/event.controller");
    let router = require("express").Router();

    // Create a new Event
    router.post("/", event.create);
    // Retrieve all Events where condition or not
    router.get("/", event.findAll);
    // Retrieve a single Event with id
    router.get("/:id", event.findOne);
    // Update a Event with id
    router.put("/:id", event.update);
    // Delete a Event with id
    router.delete("/:id", event.delete);

    app.use('/api/events', router);
};