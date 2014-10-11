module.exports = function(sequelize, DataTypes) {
  var Challenge = sequelize.define("Challenge", {
    duration: DataTypes.STRING,
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
