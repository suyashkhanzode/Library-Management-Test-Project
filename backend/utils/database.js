const Sequelize = require('sequelize');

const sequelize = new Sequelize('testproject','root','manager',
{ dialect : 'mysql',host : 'localhost'});

module.exports = sequelize;