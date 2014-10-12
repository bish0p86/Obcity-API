module.exports = function(sequelize, DataTypes) {
  var Transaction = sequelize.define("Transaction", {
    createdAt: {
      type: DataTypes.DATE,
      validate: {
        isDate: true,
        notEmpty: true,
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      validate: {
        isDate: true,
        notEmpty: true,
      }
    }
  }, {
    classMethods: {}
  });

  return Transaction;
};
