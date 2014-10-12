"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable(
      'Users',
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false
        },
        password: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        salt: {
          type: DataTypes.TEXT,
          allowNull: false
        },
        accessToken: {
          type: DataTypes.TEXT
        },
        refreshToken: {
          type: DataTypes.TEXT
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
    ).then(function(){
      migration.addIndex(
        'Users',
        ['username'],
        {
          indexName: 'UsernameIndex',
          indicesType: 'UNIQUE'
        }
      );

      done();
    });

  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('Users');
    done();
  }
};
