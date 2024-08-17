const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../util/database');


const User = sequelize.define('User', {
  // Model attributes are defined here
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    isEmail: true
  },
  post: {
    type: DataTypes.STRING,
    allowNull: false
  },
  maharera: {
    type: DataTypes.STRING,
  },
  contactNo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    // Making sure the password can't be null and has a minimum length of 1
    allowNull: false,
  },
  confirmPassword: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

// Export the User model
module.exports = User;