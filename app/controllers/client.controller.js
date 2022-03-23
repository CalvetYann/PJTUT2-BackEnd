const db = require("../models");
const Client = db.clients;
const Op = db.Sequelize.Op;

// Create and Save a new Client
exports.createClient = (caseId, client) => {

    return Client.create({
        name: client.name,
        firstname: client.firstname,
        address:client.address,
        birthdate:client.birthdate,
        createdAt:client.createdAt,
        CaseId: client.caseId
    })
        .then((client) => {
            console.log("Test new client" + JSON.stringify(client));
            console.log(">> Created  New client: " + JSON.stringify(client, null, 4));
            return client;
        })
        .catch((error) => {
            console.log("Error during creation of a New Client : ", error);
        });
};
/*Get the client for a given client id*/
exports.findClientById = (id) => {
    return Client.findByPk(id, { include: ["caseId"] })
        .then((client) => {
            return client;
        })
        .catch((err) => {
            console.log(">> Error while finding Client: ", err);
        });
};
/*Retrieve all clients from a specific case*/
exports.findAllClientsFromCase = (caseId) => {
    return Client.findAll({
        where: {caseId: caseId}
    }).then(clients => {
        console.log(clients)
    })
}
// Retrieve all Clients from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    Client.findAll({ where: condition })
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
// Find a single Client with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Client.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Client with id=" + id
            });
        });
};
// Update a Client by the id in the request
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
// Delete a Client with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
    Client.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
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
// Delete all Clients from the database.
exports.deleteAll = (req, res) => {
    Client.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Client were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all clients."
            });
        });
};
