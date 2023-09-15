const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('mkobo', 'postgres', 'Rejoice11#', {
    host: 'localhost',
    dialect: "postgres"
});

const Phone_Number = sequelize.define("Phone_Number", {
    phone_number_id_seq: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    number: {
        type: DataTypes.CHAR(40),
    },
    account_id: {
        type: DataTypes.INTEGER,
    }
})

const Account = sequelize.define("Account", {
    account_id_seq: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    auth_id: {
        type: DataTypes.CHAR(40),
    },
    username: {
        type: DataTypes.CHAR(30),
    }
})

module.exports = { Account, Phone_Number, sequelize }