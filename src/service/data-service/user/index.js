'use strict';

const bcrypt = require(`bcrypt`);

const {PASSWORD_SALT_ROUNDS} = require(`../../../config`);

class UserService {
  constructor(dataBase, logger) {
    this._dataBase = dataBase;
    this._models = dataBase.models;
    this._logger = logger;
    this._selectOptions = {
      raw: true,
      attributes: [
        `id`,
        `firstName`,
        `lastName`,
        `email`,
        `password`,
        `avatar`,
      ],
    };
  }

  async create({firstName, lastName, email, password, avatar}) {
    const {User} = this._models;

    const saltRounds = parseInt(PASSWORD_SALT_ROUNDS, 10);
    const passwordHash = await bcrypt.hash(password, saltRounds);

    try {
      return await User.create({
        firstName,
        lastName,
        email,
        password: passwordHash,
        avatar,
      });
    } catch (error) {
      this._logger.error(`Ошибка при создании пользователя: ${ error }`);

      return null;
    }
  }

  async findByEmail(email) {
    const {User} = this._models;

    try {
      return await User.findOne({
        ...this._selectOptions,
        where: {
          email,
        },
      });
    } catch (error) {
      this._logger.error(`Пользователь с email: ${ email } не найден. Ошибка: ${ error }`);

      return null;
    }
  }

  async isExist(email) {
    return !!await this.findByEmail(email);
  }
}

exports.UserService = UserService;
