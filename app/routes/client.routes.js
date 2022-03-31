const client = require("../controllers/client.controller");
module.exports = app => {
    const client = require("../controllers/client.controller");
    let router = require("express").Router();

    // Create a new Client
    router.post("/", client.create);
    // Retrieve all Clients where condition or not
    router.get("/", client.findAll);
    // Retrieve a single Client with id
    router.get("/:id", client.findOne);
    // Retrieve a single Client with name
    router.get("/:name", client.findByName);
    // Update a Client with id
    router.put("/:id", client.update);
    // Delete a Client with id
    router.delete("/:id", client.delete);

    app.use('/api/clients', router);
};