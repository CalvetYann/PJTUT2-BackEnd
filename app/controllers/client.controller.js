const { cases } = require("../models");
const db = require("../models");
const Client = db.clients;
const Op = db.Sequelize.Op;

//Create a Client
exports.create = (req, res) => {

    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Client
    const client = {
        name: req.body.name,
        firstname: req.body.firstname,
        address: req.body.address,
        birthdate: req.body.birthdate,
    };

    // Save Tutorial in the database
    Client.create(client)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Client."
            });
        });
};

//Get all clients
exports.findAll = (req, res) => {
    Client.findAll({
        include: [{
            model: cases,
            as: "lawyercases"
        }]
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Clients."
            });
        });
};

//Find on Client by ID
exports.findOne = (req, res) => {
    const id = req.params.id;
    Client.findOne({
        include: [{
            model: cases,
            as: "lawyercases"
        }],
        where: { id: id }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Client with id=" + id
            });
        });
};

//Find on Client by ID
exports.findByName = (req, res) => {
    const name = req.params.name;

    Client.find( {where: {name: name}})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Client with name=" + name
            });
        });
};

//Update a Client by ID
exports.update = (req, res) => {
    const id = req.params.id;
    Client.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Client was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Client with id=${id}. Maybe Client was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Client with id=" + id
            });
        });
};

//Delete a Client by ID
exports.delete = (req, res) => {
    const id = req.params.id;
    Client.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Client was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Client with id=${id}. Maybe Client was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Client with id=" + id
            });
        });
};



