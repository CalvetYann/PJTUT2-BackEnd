const caseController = require("../controllers/case.controller");

module.exports = app => {
    const caseController = require("../controllers/case.controller.js");
    let router = require("express").Router();

    // Create a new Lawyer case
    router.post("/", caseController.create);
    // Retrieve all Lawyer case where
    router.get("/", caseController.findAll);
    // Retrieve a single Lawyer case with id
    router.get("/:id", caseController.findOne);
    // Update a Lawyer case with id
    router.put("/:id", caseController.update);
    // Delete a Lawyer case with id
    router.delete("/:id", caseController.delete);



    app.use('/api/lawyercases', router);
};