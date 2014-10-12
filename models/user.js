var CryptoJS = require("crypto-js");

module.exports = function(sequelize, DataTypes) {
  function generatePassword(password, salt) {
    return CryptoJS.PBKDF2(password, salt, { keySize: 128/32 }).toString();
  }

  function generateSalt() {
    return CryptoJS.lib.WordArray.random(128/8).toString();
  }

  var User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
        isUnique: function(value, next) {
          User.find({ where: { username: value } }).then(function(user) {
            if (user) {
              next('Username already in use!');
            } else {
              next();
            }
          }, function(err) {
            next(err);
          });
        }
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
    accessToken: {
      type: DataTypes.TEXT
    },
    refreshToken: {
      type: DataTypes.TEXT
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
      verifyPassword: function(value) {
        var salt     = this.getDataValue('salt'),
            password = this.getDataValue('password');

        return generatePassword(value, salt) === password;
      }
    },

    setterMethods: {
      password: function (value) {
        var salt = this.getDataValue('salt');

        if (salt === undefined) {
          salt = generateSalt();
        }

        var password = generatePassword(value, salt);

        this.setDataValue('salt', salt);
        this.setDataValue('password', password);
      }
    }
  });

  return User;
};
