module.exports = function(sequelize, DataTypes) {
  var Activity = sequelize.define("Activity", {
    value: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(db) {
        Activity.belongsTo(
          db.User,
          {
            as: 'User',
            foreignKey: 'user_id'
          }
        )
      }
    }
  });

  return Activity;
};
