const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./app/models");
const caseController = require("./app/controllers/case.controller");
const clientController = require("./app/controllers/client.controller");
const eventController = require("./app/controllers/event.controller");

/*const ClientController = require("./app/controllers/client.controller");
const CaseController = require("./app/controllers/case.controller");*/

let corsOptions = {
    origin: "http://localhost:8081"
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

/*db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});*/

//Routes
require("./app/routes/client.routes")(app);
require("./app/routes/case.routes")(app);
require("./app/routes/event.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});