const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    const Client = sequelize.define("client", {
        name: {
            type: DataTypes.STRING,
        },
        firstname: {
            type: DataTypes.STRING,
        },
        address: {
            type: DataTypes.STRING,
        },
        birthdate: {
            type: DataTypes.STRING,
        },
    });


    return Client;
};

