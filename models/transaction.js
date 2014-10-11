module.exports = function(sequelize, DataTypes) {
  var Transaction = sequelize.define("Transaction", {
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    classMethods: {}
  });

  return Transaction;
};
