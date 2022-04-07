const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    const Case = sequelize.define("cases", {
        ref: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        closed_at: {
            type: DataTypes.DATEONLY,
            allowNull: true
        }
    });


    return Case;
};

