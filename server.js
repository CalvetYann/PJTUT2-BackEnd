const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./app/models");

/*let corsOptions = {
    origin: "http://localhost",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}*/

app.use(cors());
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