const db = require("../models");
const Case = db.cases;
const Op = db.Sequelize.Op;


exports.createCase = (lawyerCase) => {
    return Case.create({
        ref: lawyerCase.ref,
        description: lawyerCase.description,
        created_at: lawyerCase.created_at,
        state: lawyerCase.state,
        closed_at: lawyerCase.closed_at,
    })
        .then((lawyerCase) => {
            console.log(">> Created new Lawyer Case: " + JSON.stringify(lawyerCase, null, 4));
            return lawyerCase;
        })
        .catch((err) => {
            console.log(">> Error while creating tutorial: ", err);
        });
};

//Get the Case for a given Id

exports.findAll = () => {
    return Case.findAll({
    }).then((lawyercases) => {
        return lawyercases;
    });
};

exports.findCaseClientsById = (caseId) => {
    return Case.findByPk(caseId, { include: ["clients"] })
        .then((lawyercase) => {
            return lawyercase;
        })
        .catch((err) => {
            console.log(">> Error while finding tutorial: ", err);
        });
}

exports.findCaseEventsById = (caseId) => {
    return Case.findByPk(caseId, { include: ["events"] })
        .then((lawyercase) => {
            return lawyercase;
        })
        .catch((err) => {
            console.log(">> Error while finding tutorial: ", err);
        });
}

exports.findCaseById = (caseId) => {
    return Case.findByPk(caseId, { include: ["clients", "events"],  })
        .then((lawyercase) => {
            return lawyercase;
        })
        .catch((err) => {
            console.log(">> Error while finding tutorial: ", err);
        });
}