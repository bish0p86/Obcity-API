"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable(
      'Challenges',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        charity_id: {
          type: DataTypes.INTEGER,
          allowNull: false
        },
        goal: {
          type: DataTypes.STRING,
          allowNull: false
        },
        penality: {
          type: DataTypes.STRING,
          allowNull: false
        },
        duration: {
          type: DataTypes.DATE,
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
    migration.dropTable('Challenges');
    done();
  }
};
