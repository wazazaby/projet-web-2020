'use strict';
module.exports = (sequelize, DataTypes) => {
  const Test = sequelize.define('Test', {
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    freezeTableName: true,
    tableName: 'test',
  });
  Test.associate = function(models) {
    // associations can be defined here
  };
  return Test;
};