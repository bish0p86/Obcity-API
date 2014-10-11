"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable(
      'user',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        username: {
          type: DataTypes.STRING
        },
        charity: {
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
    migration.dropTable('user');
    done();
  }
};
