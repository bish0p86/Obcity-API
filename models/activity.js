"use strict";

module.exports = function(sequelize, DataTypes) {
  var Activity = sequelize.define("Activity", {
    name: DataTypes.STRING,
    value: DataTypes.INTEGER
  }, {
    classMethods: {}
  });

  return Activity;
};
