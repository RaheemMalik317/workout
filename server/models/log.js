const { DataTypes } = require('sequelize');
const db = require('../db');

const workOut = db.define('workout', {
    owner_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    definition: {
        type: DataTypes.STRING,
        allowNull: false
    },
    result: {
        type: DataTypes.STRING,
        allowNull: false
    }
    
})

module.exports = workOut;