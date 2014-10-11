"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable(
      'activity',
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
      },
      {
        engine: 'MYISAM',
        charset: 'latin1'
      }
    );

    done();
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('challenge');
    done();
  }
};
