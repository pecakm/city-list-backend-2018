const Sequelize = require('sequelize');

const sequelize = new Sequelize('citylist', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    define: {
        timestamps: false,
        charset: 'utf8',
        dialectOptions: {
            collate: 'utf8_general_ci'
        }
    }
});

module.exports = sequelize;
