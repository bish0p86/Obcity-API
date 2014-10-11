"use strict";

module.exports = function(sequelize, DataTypes) {
  var Activity = sequelize.define("Challenge", {
    duration: DataTypes.STRING
  }, {
    classMethods: {}
  });

  return Activity;
};
