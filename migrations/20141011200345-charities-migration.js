"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable(
      'Charities',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        name: {
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


    migration.addIndex(
      'Charities',
      ['name'],
      {
        indexName: 'NameIndex',
        indicesType: 'UNIQUE'
      }
    );
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('Charities');
    done();
  }
};
