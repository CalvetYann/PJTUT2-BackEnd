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
    //Add client to a Lawyercase
    router.put("/addtolc/:id/:clientId", caseController.addClientToLc)
    //Add event to lawyer case
    router.put("/events/:id", caseController.addEvent)
    //update lawyercase status
    router.put("/status/:id", caseController.updateStatus)
    //Delete client from a Lawyercase
    router.delete("/removefromlc/:id/:clientId", caseController.removeClientFromLc)

    app.use('/api/lawyercases', router);
};