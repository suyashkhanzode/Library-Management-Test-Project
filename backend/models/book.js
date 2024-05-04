const Sequelize = require('sequelize');
const sequelize = require('../utils/database');

const Book = sequelize.define('book',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    taken_on: {
        type: Sequelize.DATE,
        allowNull: false,
        
    },
    return_date: {
        type: Sequelize.DATE,
        allowNull: false,
       
    },
    current_fine: {
        type: Sequelize.DOUBLE,
        allowNull: false,
        defaultValue: 0
    },
    return_status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0 // Change default value to 0 (for false)
    }
});

module.exports = Book;
