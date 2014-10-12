module.exports = function(sequelize, DataTypes) {
  var Charity = sequelize.define('Charity', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      }
    }
  }, {
    classMethods: {}
  });

  return Charity;
};
