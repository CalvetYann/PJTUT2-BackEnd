const db = require("../models");
const Event = db.events;
const Op = db.Sequelize.Op;

// Create and Save a new Client
exports.createEvent = (caseId, event) => {
    return Event.create({
        description: event.description,
        date: event.date,
        duration:event.duration,
        caseId: caseId,
    })
        .then((event) => {
            console.log(">> Created Event: " + JSON.stringify(event, null, 4));
            return event;
        })
        .catch((error) => {
            console.log("Error during creation of a New Client : ", error);
        });
};

/*Get the client for a given client id*/

exports.findEventById = (id) => {
    return Event.findByPk(id, { include: ["caseId"] })
        .then((event) => {
            return event;
        })
        .catch((err) => {
            console.log(">> Error while finding Client: ", err);
        });
};

exports.findAllClientsFromCase = (caseId) => {
    return Event.findAll({
        where: {caseId: caseId}
    }).then(events => {
        console.log(events)
    })
}

