module.exports = app => {
    const client = require("../controllers/client.controller");
    let router = require("express").Router();

    // Create a new Client
    router.post("/", client.createClient);
    // Retrieve all Clients where condition or not
    router.get("/", client.findAll);
    // Retrieve a single Tutorial with id
    router.get("/:id", client.findOne);
    // Update a Tutorial with id
    router.put("/:id", client.update);
    // Delete a Tutorial with id
    router.delete("/:id", client.delete);
    // Delete all Tutorials
    router.delete("/", client.deleteAll);

    app.use('/api/clients', router);
};