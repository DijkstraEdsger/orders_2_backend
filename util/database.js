const Sequelize = require('sequelize');

const sequelize = new Sequelize('pedidos', 'humberto', '123', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
