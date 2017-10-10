'use strict';
module.exports = function(sequelize, DataTypes) {
  var collection = sequelize.define('collection', {
    set_id: DataTypes.STRING,
    title: DataTypes.STRING,
    year: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    imglink: DataTypes.STRING,
    count: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
         models.collection.belongsTo(models.user);
      }
    }
  });
  return collection;
};
