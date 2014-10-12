var CryptoJS = require("crypto-js");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      },
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    salt: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      validate: {
        isDate: true,
        notEmpty: true
      }
    },
    updatedAt: {
      type: DataTypes.DATE,
      validate: {
        isDate: true,
        notEmpty: true
      }
    }
  }, {
    classMethods: {},
    instanceMethods: {
      verifyPassword: function(password) {
        return true;
      }
    },

    setterMethods: {
      password: function (value) {
        var salt = this.getDataValue('salt');

        if (salt === undefined) {
          salt = CryptoJS.lib.WordArray.random(128/8);
        }

        var password = CryptoJS.PBKDF2(value, salt, { keySize: 128/32 });

        this.setDataValue('salt', salt.toString());
        this.setDataValue('password', password.toString());
      }
    }
  });

  return User;
};
