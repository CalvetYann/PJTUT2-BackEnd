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
        caseId: caseId,
    })
        .then((client) => {
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

exports.findAllClientsFromCase = (caseId) => {
    return Client.findAll({
        where: {caseId: caseId}
    }).then(clients => {
        console.log(clients)
    })
}


//TO DO : Refactoring plus tard

// Retrieve all Clients from the database.
exports.findAll = (req, res) => {

};
// Find a single Client with an id
exports.findOne = (req, res) => {

};
// Update a Client by the id in the request
exports.update = (req, res) => {

};
// Delete a Client with the specified id in the request
exports.delete = (req, res) => {

};
// Delete all Clients from the database.
exports.deleteAll = (req, res) => {

};
