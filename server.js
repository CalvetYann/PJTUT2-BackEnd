const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./app/models");
const caseController = require("./app/controllers/case.controller");
const clientController = require("./app/controllers/client.controller");
const eventController = require("./app/controllers/event.controller");

const run = async () => {

   /* const case1 = await caseController.createFixture({
        ref: "3123124",
        description: "Lorem ipsum de test pour case",
        state: 1,
        closed_at: "2020-04-14T09:49:14.021Z",
    });

    const case2 = await caseController.createFixture({
        ref: "3123424",
        description: "Lorem ipsum de test pour case2",
        state: 1,
        closed_at: "2020-04-14T09:49:14.021Z",
    });

    const event1 = await eventController.createEvent(case1.id, {
        description:"Préparation du dossier client",
        date:Date.now(),
        duration:10,
    })

    const event2 = await eventController.createEvent(case1.id, {
        description:"Lecture du dossier client",
        date:Date.now(),
        duration:90,
    })

    const event3 = await eventController.createEvent(case1.id, {
        description:"Préparation du jugement",
        date:Date.now(),
        duration:15,
    })

    const client2 = await clientController.createClient(case1.id, {
        name:"Demange",
        firstname:"Caroline",
        address:"3 rue Pablo Picasso",
        birthdate:"1990-10-22",
        createdAt:Date.now(),
    })

    const client3 = await clientController.createClient(case1.id, {
        name:"Witmer",
        firstname:"Charlotte",
        address:"3 rue Pablo Picasso",
        birthdate:"1990-10-22",
        createdAt:Date.now(),
    })

    /!*const AllCases = await caseController.findAll();*!/
    const clientsCase1 = await caseController.findCaseClientsById(case1.id);
    const case1Infos = await caseController.findCaseById(case1.id);


    console.log(
        ">> Liste des clients de l'affaire n°" + clientsCase1.id,
        JSON.stringify(clientsCase1, null, 2)
    );

    console.log(
        ">> Liste des Evenements de l'affaire n°" + eventsCase1.id,
        JSON.stringify(eventsCase1, null, 2)
    );

    console.log()*/

};

/*const ClientController = require("./app/controllers/client.controller");
const CaseController = require("./app/controllers/case.controller");*/

let corsOptions = {
    origin: "http://localhost:8081",
    methods:[
        "GET",
        "POST",
        "PUT",
        "DELETE"
    ]
}

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
        res.json({ message: "Welcome to LawFirm Manager application." });
});

db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
    run();
});

//Routes
require("./app/routes/client.routes")(app);
require("./app/routes/case.routes")(app);
require("./app/routes/event.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});