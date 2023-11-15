/**
 * db.js
 * @description :: exports values used to make connection with SQL database
 */

const dotenv = require('dotenv');
dotenv.config({ path: '.env' });




if (process.env.NODE_ENV !== 'test') {
  
  module.exports = {

    dbHost : process.env.HOST,
    dbPort : process.env.DB_PORT,
    dbUser : process.env.DATABASE_USERNAME,
    dbPass : process.env.DATABASE_PASSWORD,
    dbName : process.env.DATABASE_NAME,
    dbDialect :  'mysql'
  };

} else {
  
  module.exports = {
    dbHost : process.env.HOST,
    dbPort : process.env.DB_PORT,
    dbUser : process.env.DATABASE_USERNAME,
    dbPass : process.env.DATABASE_PASSWORD,
    dbName : process.env.DATABASE_NAME,
    dbDialect :  'mysql'
  };
}
