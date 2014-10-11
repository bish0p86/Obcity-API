"use strict";

module.exports = function(sequelize, DataTypes) {
  var Transaction = sequelize.define("Transaction", {

  }, {
    classMethods: {}
  });

  return Transaction;
};
