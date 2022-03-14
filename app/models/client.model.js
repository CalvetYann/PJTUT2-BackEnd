const {DataTypes} = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define("client", {
        name: {
            type: DataTypes.STRING
        },
        firstname: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        birthdate: {
            type: DataTypes.STRING
        },
        createdAt: {
            type: DataTypes.DATE
        },
    });
    return Client;
}