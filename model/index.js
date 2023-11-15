
let dbConnection = require('../config/dbConnection');

const Accountpromise = require('./account');
const Activitypromise = require('./activity');
const Assetpromise = require('./asset');
const Associationpromise = require('./association');
const Blogpromise = require('./blog');
const Blogcategorypromise = require('./blogcategory');
const Contactpromise = require('./contact');
const Donationpromise = require('./donation');
const Imagepromise = require('./image');
const Leaderpromise = require('./leader');
const Nationpromise = require('./nation');
const ProjectRoutepromise = require('./projectRoute');
const PushNotificationpromise = require('./pushNotification');
const Regionpromise = require('./region');
const Rolepromise = require('./role')
const RouteRolepromise = require('./routeRole');
const Subregionpromise = require('./subregion');
const UserAuthSettingspromise = require('./userAuthSettings');
const UserRolepromise = require('./userRole');
const UserTokenspromise = require('./userTokens');
const db = {}

const dbpromise = dbConnection.then( async (dbConnection) => {
db.sequelize = dbConnection;

 db.blog = await Blogpromise;
 db.account = await Accountpromise;
 db.activity = await Activitypromise;
 db.asset = await Assetpromise;
 db.association = await Associationpromise;
 db.blogcategory = await Blogcategorypromise;
 db.contact = await Contactpromise;
 db.donation = await Donationpromise;
 db.image = await Imagepromise;
 db.leader = await Leaderpromise;
 db.nation = await Nationpromise;
 db.projectRoute = await ProjectRoutepromise;
 db.push = await PushNotificationpromise;
 db.region = await Regionpromise;
 db.role = await Rolepromise;
 db.routeRole = await RouteRolepromise;
 db.subregion = await Subregionpromise;
 db.userAuthSettings = await UserAuthSettingspromise;
 db.userRole = await UserRolepromise;
 db.userTokens = await UserTokenspromise;


db.blog.belongsTo(db.activity, {
  foreignKey: 'idActivity',
  as: '_idActivity',
  targetKey: 'idActivity' 
});

db.activity.hasOne(db.blog, {
  foreignKey: 'idActivity',
  sourceKey: 'idActivity' 
});
db.activity.belongsTo(db.subregion, {
  foreignKey: 'idSubRegion',
  as: '_idSubRegion',
  targetKey: 'idSubRegion' 
});
db.subregion.hasOne(db.activity, {
  foreignKey: 'idSubRegion',
  sourceKey: 'idSubRegion' 
});
db.nation.belongsTo(db.subregion, {
  foreignKey: 'idSubRegion',
  as: '_idSubRegion',
  targetKey: 'idSubRegion' 
});
db.subregion.hasOne(db.nation, {
  foreignKey: 'idSubRegion',
  sourceKey: 'idSubRegion' 
});
db.asset.belongsTo(db.subregion, {
  foreignKey: 'idSubRegion',
  as: '_idSubRegion',
  targetKey: 'idSubRegion' 
});
db.subregion.hasOne(db.asset, {
  foreignKey: 'idSubRegion',
  sourceKey: 'idSubRegion' 
});
db.activity.belongsTo(db.region, {
  foreignKey: 'idRegion',
  as: '_idRegion',
  targetKey: 'idRegion' 
});
db.region.hasOne(db.activity, {
  foreignKey: 'idRegion',
  sourceKey: 'idRegion' 
});
db.subregion.belongsTo(db.region, {
  foreignKey: 'idRegion',
  as: '_idRegion',
  targetKey: 'idRegion' 
});
db.region.hasOne(db.subregion, {
  foreignKey: 'idRegion',
  sourceKey: 'idRegion' 
});
db.nation.belongsTo(db.region, {
  foreignKey: 'idRegion',
  as: '_idRegion',
  targetKey: 'idRegion' 
});
db.region.hasOne(db.nation, {
  foreignKey: 'idRegion',
  sourceKey: 'idRegion' 
});
db.asset.belongsTo(db.region, {
  foreignKey: 'idRegion',
  as: '_idRegion',
  targetKey: 'idRegion' 
});
db.region.hasOne(db.asset, {
  foreignKey: 'idRegion',
  sourceKey: 'idRegion' 
});
db.activity.belongsTo(db.nation, {
  foreignKey: 'idNation',
  as: '_idNation',
  targetKey: 'idNation' 
});
db.nation.hasMany(db.activity, {
  foreignKey: 'idNation',
  sourceKey: 'idNation' 
});
db.asset.belongsTo(db.nation, {
  foreignKey: 'idNation',
  as: '_idNation',
  targetKey: 'idNation' 
});
db.nation.hasOne(db.asset, {
  foreignKey: 'idNation',
  sourceKey: 'idNation' 
});
db.account.belongsTo(db.nation, {
  foreignKey: 'idNation',
  as: '_idNation',
  targetKey: 'idNation' 
});
db.nation.hasOne(db.account, {
  foreignKey: 'idNation',
  sourceKey: 'idNation' 
});
db.account.belongsTo(db.image, {
  foreignKey: 'idImage',
  as: '_idImage',
  targetKey: 'idImage' 
});
db.image.hasMany(db.account, {
  foreignKey: 'idImage',
  sourceKey: 'idImage' 
});
db.blog.belongsTo(db.blogcategory, {
  foreignKey: 'idBlogCategory',
  as: '_idBlogCategory',
  targetKey: 'idBlogCategory' 
});
db.blogcategory.hasOne(db.blog, {
  foreignKey: 'idBlogCategory',
  sourceKey: 'idBlogCategory' 
});
db.leader.belongsTo(db.association, {
  foreignKey: 'idAssociation',
  as: '_idAssociation',
  targetKey: 'idAssociation' 
});
db.association.hasOne(db.leader, {
  foreignKey: 'idAssociation',
  sourceKey: 'idAssociation' 
});
db.account.belongsTo(db.association, {
  foreignKey: 'idAssociation',
  as: '_idAssociation',
  targetKey: 'idAssociation' 
});
db.association.hasOne(db.account, {
  foreignKey: 'idAssociation',
  sourceKey: 'idAssociation' 
});
db.activity.belongsTo(db.account, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.account.hasMany(db.activity, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.activity.belongsTo(db.account, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.account.hasMany(db.activity, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.subregion.belongsTo(db.account, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.account.hasMany(db.subregion, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.subregion.belongsTo(db.account, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.account.hasMany(db.subregion, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.region.belongsTo(db.account, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.account.hasMany(db.region, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.region.belongsTo(db.account, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.account.hasMany(db.region, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.nation.belongsTo(db.account, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.account.hasMany(db.nation, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.nation.belongsTo(db.account, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.account.hasMany(db.nation, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.leader.belongsTo(db.account, {
  foreignKey: 'idAccount',
  as: '_idAccount',
  targetKey: 'idAccount' 
});
db.account.hasOne(db.leader, {
  foreignKey: 'idAccount',
  sourceKey: 'idAccount' 
});
db.leader.belongsTo(db.account, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.account.hasMany(db.leader, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.leader.belongsTo(db.account, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.account.hasMany(db.leader, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.image.belongsTo(db.account, {
  foreignKey: 'idAccount',
  as: '_idAccount',
  targetKey: 'idAccount' 
});
db.account.hasOne(db.image, {
  foreignKey: 'idAccount',
  sourceKey: 'idAccount' 
});
db.image.belongsTo(db.account, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.account.hasMany(db.image, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.image.belongsTo(db.account, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.account.hasMany(db.image, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.donation.belongsTo(db.account, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.account.hasMany(db.donation, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.donation.belongsTo(db.account, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.account.hasMany(db.donation, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.donation.belongsTo(db.account, {
  foreignKey: 'idAccount',
  as: '_idAccount',
  targetKey: 'idAccount' 
});
db.account.hasOne(db.donation, {
  foreignKey: 'idAccount',
  sourceKey: 'idAccount' 
});
db.contact.belongsTo(db.account, {
  foreignKey: 'idAccount',
  as: '_idAccount',
  targetKey: 'idAccount' 
});
db.account.hasOne(db.contact, {
  foreignKey: 'idAccount',
  sourceKey: 'idAccount' 
});
db.contact.belongsTo(db.account, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.account.hasMany(db.contact, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.contact.belongsTo(db.account, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.account.hasMany(db.contact, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.blogcategory.belongsTo(db.account, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.account.hasMany(db.blogcategory, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.blogcategory.belongsTo(db.account, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.account.hasMany(db.blogcategory, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.blog.belongsTo(db.account, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.account.hasMany(db.blog, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.blog.belongsTo(db.account, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.account.hasMany(db.blog, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.association.belongsTo(db.account, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.account.hasMany(db.association, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.association.belongsTo(db.account, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.account.hasMany(db.association, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.asset.belongsTo(db.account, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.account.hasMany(db.asset, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.asset.belongsTo(db.account, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.account.hasMany(db.asset, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.account.belongsTo(db.account, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.account.hasMany(db.account, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.account.belongsTo(db.account, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.account.hasMany(db.account, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.userAuthSettings.belongsTo(db.account, {
  foreignKey: 'userId',
  as: '_userId',
  targetKey: 'id' 
});
db.account.hasMany(db.userAuthSettings, {
  foreignKey: 'userId',
  sourceKey: 'id' 
});
db.userAuthSettings.belongsTo(db.account, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.account.hasMany(db.userAuthSettings, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.userAuthSettings.belongsTo(db.account, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.account.hasMany(db.userAuthSettings, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.userTokens.belongsTo(db.account, {
  foreignKey: 'userId',
  as: '_userId',
  targetKey: 'id' 
});
db.account.hasMany(db.userTokens, {
  foreignKey: 'userId',
  sourceKey: 'id' 
});
db.userTokens.belongsTo(db.account, {
  foreignKey: 'addedBy',
  as: '_addedBy',
  targetKey: 'id' 
});
db.account.hasMany(db.userTokens, {
  foreignKey: 'addedBy',
  sourceKey: 'id' 
});
db.userTokens.belongsTo(db.account, {
  foreignKey: 'updatedBy',
  as: '_updatedBy',
  targetKey: 'id' 
});
db.account.hasMany(db.userTokens, {
  foreignKey: 'updatedBy',
  sourceKey: 'id' 
});
db.userRole.belongsTo(db.account, {
  foreignKey: 'userId',
  as: '_userId',
  targetKey: 'id' 
});
db.account.hasMany(db.userRole, {
  foreignKey: 'userId',
  sourceKey: 'id' 
});
db.routeRole.belongsTo(db.role, {
  foreignKey: 'roleId',
  as: '_roleId',
  targetKey: 'id' 
});
db.role.hasMany(db.routeRole, {
  foreignKey: 'roleId',
  sourceKey: 'id' 
});
db.userRole.belongsTo(db.role, {
  foreignKey: 'roleId',
  as: '_roleId',
  targetKey: 'id' 
});
db.role.hasMany(db.userRole, {
  foreignKey: 'roleId',
  sourceKey: 'id' 
});
db.routeRole.belongsTo(db.projectRoute, {
  foreignKey: 'routeId',
  as: '_routeId',
  targetKey: 'id' 
});
db.projectRoute.hasMany(db.routeRole, {
  foreignKey: 'routeId',
  sourceKey: 'id' 
});


return db;
   
})


module.exports = dbpromise;