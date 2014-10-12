module.exports = function(sequelize, DataTypes) {
  var Activity = sequelize.define("Activity", {
    value: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true,
        notEmpty: true
      }
    }
  }, {
    classMethods: {
      associate: function(db) {
        Activity.belongsTo(
          db.Challenge,
          {
            as: 'Challenge',
            foreignKey: 'challenge_id'
          }
        );

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
