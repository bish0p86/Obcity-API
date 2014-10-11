"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable(
      'card',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        alias: {
          type: DataTypes.STRING
        },
        createdAt: {
          type: DataTypes.DATE
        },
        updatedAt: {
          type: DataTypes.DATE
        }
      },
      {
        engine: 'MYISAM',
        charset: 'latin1'
      }
    );

    done();
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('card');
    done();
  }
};
