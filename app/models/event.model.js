const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    const Event = sequelize.define("event", {
        description: {
            type: DataTypes.STRING
        },
        duration: {
            type: DataTypes.INTEGER
        }
    });

    return Event;
}