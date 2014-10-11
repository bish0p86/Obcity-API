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
        name: {
          type: DataTypes.STRING
        },
        value: {
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
    migration.dropTable('Activities');
    done();
  }
};
