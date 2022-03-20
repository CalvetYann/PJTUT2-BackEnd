const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    const Event = sequelize.define("event", {
        description: {
            type: DataTypes.STRING
        },
        date: {
            type: DataTypes.DATE
        },
        duration: {
            type: DataTypes.STRING
        }
    });

    return Event;
}