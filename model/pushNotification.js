/**
 * pushNotification.js
 * @description :: sequelize model of database table pushNotification
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let PushNotification = sequelize.define('pushNotification',{
  id:{
    type:DataTypes.INTEGER,
    autoIncrement:true,
    primaryKey:true
  },
  userId:{ type:DataTypes.INTEGER },
  deviceId:{
    type:DataTypes.STRING,
    allowNull:false
  },
  playerId:{ type:DataTypes.STRING },
  isActive:{ type:DataTypes.BOOLEAN },
  isDeleted:{ type:DataTypes.BOOLEAN }
}
,{
  hooks:{
    beforeCreate: [
      async function (pushNotification,options){
        pushNotification.isActive = true;
        pushNotification.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (pushNotification,options){
        if (pushNotification !== undefined && pushNotification.length) { 
          for (let index = 0; index < pushNotification.length; index++) { 
        
            const element = pushNotification[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
PushNotification.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(PushNotification);
sequelizePaginate.paginate(PushNotification);
module.exports = PushNotification;
