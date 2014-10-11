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
        duration: {
          type: DataTypes.STRING
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
