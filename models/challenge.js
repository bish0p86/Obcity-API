module.exports = function(sequelize, DataTypes) {
  var Challenge = sequelize.define("Challenge", {
    goal: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: true,
        notEmpty: true,
      }
    },
    penality: {
      type: DataTypes.STRING,
      validate: {
        isNumeric: true,
        notEmpty: true,
      }
    },
    duration: {
      type: DataTypes.DATE,
      validate: {
        isDate: true,
        notEmpty: true,
      }
    },
  }, {
    classMethods: {
      associate: function(db) {
        Challenge.belongsTo(
          db.User,
          {
            as: 'Charity',
            foreignKey: 'charity_id'
          }
        );

        Challenge.belongsTo(
          db.User,
          {
            as: 'User',
            foreignKey: 'user_id'
          }
        );
      }
    }
  });

  return Challenge;
};
