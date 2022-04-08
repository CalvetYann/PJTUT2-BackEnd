const { clients } = require("../models");
const db = require("../models");
const Case = db.cases;
const Client = db.clients;
const Event = db.events;
const Op = db.Sequelize.Op;

//Create a new lawyer case
exports.create = (req, res) => {

    if (!req.body.ref) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a LawyerCase
    const lawyerCase = {
        ref: req.body.ref,
        description: req.body.description,
        closed_at: req.body.closed_at,
    };

    // Save Tutorial in the database
    Case.create(lawyerCase)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Lawyercase."
            });
        });
};

//Get all lawyer case
exports.findAll = (req, res) => {
    Case.findAll({
        include: [{
            model: clients,
            as: "clients"
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

//Find on lawyer case by ID
exports.findOne = (req, res) => {
    const id = req.params.id;
    Case.findOne({
        where: { id: id },
        include: [{
            model: clients,
            as: "clients"
        },
        {
            model: Event,
            as: "events"
        }]

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

//Update a lawyer case by ID
exports.update = (req, res) => {
    const id = req.params.id;
    Case.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Lawyer Case was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Lawyer Case with id=${id}. Maybe Lawyer Case was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Lawyer case with id=" + id
            });
        });
};

//Delete a lawyer case by ID
exports.delete = (req, res) => {
    const id = req.params.id;
    Case.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Lawyer case was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Lawyer case with id=${id}. Maybe Lawyer case was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Lawyer case with id=" + id
            });
        });
};

exports.addClientToLc = (req, res) => {
    const lawyercaseId = req.params.id;
    const clientId = req.params.clientId;
    return Case.findByPk(lawyercaseId)
       .then((lawyercase) => {
           if(!lawyercase){
               res.send("Lawyercase Not Found!");
               return null
           }

           return Client.findByPk(clientId)
               .then((client) => {
                   lawyercase.addClient(client);
                   res.send(`Client id : ${client.id} added to Lawyercase ${lawyercase.id}`)
               })
               .catch((err) => {
                   res.send(">> Error while adding client to lawyercase:" , err)
               })
       })
}

exports.updateStatus = (req, res) => {
    const id = req.params.id;
    Case.update(req.body, {
        where: { id: id }
    })
        .then(() => {
            res.send({
                message: "Status was updated successfully."
            });
        })
        .catch((e) => {
            res.status(500).send({
                message: "Error updating Lawyer case with id=" + e
            });
        });
};

//Create event and add to case
exports.addEvent = (req, res) => {
    const id = req.params.id;
    const event = req.body;
    console.log(event)
    Case.findByPk(id)
        .then(lawyercase => {
            if(!lawyercase){
                res.send("Lawyercase Not Found!");
                return null
            }
            return Event.create(event)
                .then(event => {
                    if(!event){
                        return null
                    }
                    lawyercase.addEvent(event);
                    res.send(`Event added to Lawyercase ${lawyercase.id}`)
                })
                .catch(err => {
                    res.send(">> Error while adding event to lawyercase:" , err)
                })
        })
        .catch(err => {
            res.send(">> Error while finding lawyercase:" , err)
        })
}

exports.removeClientFromLc = (req, res) => {
    const lawyercaseId = req.params.id;
    const clientId = req.params.clientId;
    return Case.findByPk(lawyercaseId)
        .then((lawyercase) => {
            if(!lawyercase){
                res.send("Lawyercase Not Found!");
                return null
            }

            return Client.findByPk(clientId)
                .then((client) => {
                    if(!client){
                        return null
                    }
                    lawyercase.removeClient(client);
                    res.send(`Client id : ${client.id} removed from Lawyercase ${lawyercase.id}`)
                })
                .catch((err) => {
                    res.send(">> Error while removing client from lawyercase:" , err)
                })
        })
}

