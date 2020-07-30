'use strict';

const {UserFirstNameRequirements, UserLastNameRequirements, UserEmailRequirements, UserPasswordRequirements} = require(`./constants`);

exports.createUserModel = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {
  }

  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(UserFirstNameRequirements.length.MAX), /* eslint-disable-line */
      field: `first_name`,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(UserLastNameRequirements.length.MAX), /* eslint-disable-line */
      field: `last_name`,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(UserEmailRequirements.length.MAX), /* eslint-disable-line */
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(UserPasswordRequirements.length.MAX), /* eslint-disable-line */
      allowNull: false,
      validate: {
        len: [UserPasswordRequirements.length.MIN, UserPasswordRequirements.length.MAX],
      },
    },
    avatar: {
      type: DataTypes.TEXT,
    },
  }, {
    sequelize,
    timestamps: false,
    paranoid: false,
    modelName: `user`,
  });

  return User;
};
