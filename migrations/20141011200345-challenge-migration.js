"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable(
      'Challenges',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        user_id: {
          type: DataTypes.INTEGER
        },
        charity_id: {
          type: DataTypes.INTEGER
        },
        finishAt: {
          type: DataTypes.DATE
        },
        createdAt: {
          type: DataTypes.DATE
        },
        updatedAt: {
          type: DataTypes.DATE
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
