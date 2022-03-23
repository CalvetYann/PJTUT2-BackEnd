const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.cases = require("./case.model")(sequelize,Sequelize);
db.clients = require("./client.model")(sequelize,Sequelize);
db.events = require("./event.model")(sequelize,Sequelize);

db.clients.belongsTo(db.cases,{
    foreignKey: {
        name: "caseId",
        allowNull: true
    },
    as:"case",

});

db.events.belongsTo(db.cases, {
    foreignKey: {
        name: "caseId",
        allowNull: true
    },
    as: "case",
})

db.cases.hasMany(db.clients, {as:"clients"});
db.cases.hasMany(db.events, {as:"events"});


module.exports = db;

