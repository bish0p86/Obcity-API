"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable(
      'Activities',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        challenge_id: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        value: {
          type: DataTypes.STRING,
          allowNull: false
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false
        }
      }
    );

    done();
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('Activities');
    done();
  }
};
