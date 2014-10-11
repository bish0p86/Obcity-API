module.exports = function(sequelize, DataTypes) {
  var Charity = sequelize.define('Charity', {
    name: DataTypes.STRING
  }, {
    classMethods: {}
  });

  return Charity;
};
