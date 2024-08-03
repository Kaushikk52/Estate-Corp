const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('estatecorp', 'root', 'root', {
    dialect: 'mysql',
    host: 'localhost',
    logging: false // Disable Sequelize logging
})


async function connectToDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

// Call the async function to establish the connection
connectToDatabase();


module.exports = sequelize