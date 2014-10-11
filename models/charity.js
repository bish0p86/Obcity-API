'use strict';

module.exports = function(sequelize, DataTypes) {
  var Activity = sequelize.define('Charity', {
    name: DataTypes.STRING
  }, {
    classMethods: {}
  });

  return Activity;
};
