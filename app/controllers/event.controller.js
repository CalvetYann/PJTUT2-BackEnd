const db = require("../models");
const Event = db.events;
const Op = db.Sequelize.Op;

// Create a new Event
exports.create = (req, res) => {

    if (!req.body.description) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create an Event
    const event = {
        description: req.body.description,
        duration: req.body.duration,
    };

    // Save Event in the database
    Event.create(event)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Event."
            });
        });
};

//Get all Events
exports.findAll = (req, res) => {
    Event.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving events."
            });
        })
}

//Find one Event by Id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Event.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Event with id=" + id
            });
        })
}

//Update an Event
exports.update = (req, res) => {
    const id = req.params.id;
    Event.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Event was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Event with id=${id}. Maybe Event was not found or req.description is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Event with id=" + id
            });
        });
};

//Delete an Event
exports.delete = (req, res) => {
    const id = req.params.id;
    Event.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Event was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Event with id=${id}. Maybe Event was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Event with id=" + id
            });
        })
}

