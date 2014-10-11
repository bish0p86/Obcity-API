"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable(
      'Charities',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: DataTypes.STRING
        },
        createdAt: {
          type: DataTypes.DATE
        },
        updatedAt: {
          type: DataTypes.DATE
        }
      }
    ).then(function () {
      var charities = [
        'British Heart Foundation',
        'Diabetes UK'
      ];

      charities.forEach(function(charity){
        migration.migrator.sequelize.query(
          "INSERT INTO Charities (name, createdAt, updatedAt) values ('" + charity + "', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)"
        );
      });

      done();
    });
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('Charities');
    done();
  }
};
