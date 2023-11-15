const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');
const dbConfig = require('./db');



const sequelizePromise = initialize();

async function initialize() {
  try {
    const { dbHost: host, dbPort: port, dbUser: user, dbPass: password, dbName: dbname, dbDialect: dbdialect } = dbConfig;

    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbname}\`;`);
    await connection.end();
    const sequelize = new Sequelize(dbname, user, password, {
     host: 'localhost',
     port: port,
    dialect: dbdialect,
   
    });

    await sequelize.authenticate()
      .then(() => {
        console.log('Connection established.');
        return sequelize;
      })
      .catch(err => {
        console.error('Unable to connect:', err);
      });
    // console.log('Database & tables created!');

    return sequelize;  // Return the sequelize instance

  } catch (error) {
    console.error('Could not connect to the database:', error);
  }
}



module.exports = sequelizePromise