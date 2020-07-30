'use strict';

const Sequelize = require(`sequelize`);

const {pinoLogger} = require(`../logger`);
const {createUserModel} = require(`./models/user`);
const {createCategoryModel, createCategoryAssociations} = require(`./models/category`);
const {createArticleModel, createArticleAssociations} = require(`./models/article`);
const {createCommentModel, createCommentAssociations} = require(`./models/comment`);
const {DB_HOST, DB_PORT, DB_USER_NAME, DB_NAME, DB_PASSWORD} = require(`../../config`);

const DB_URI = `postgres://${ DB_USER_NAME }:${ DB_PASSWORD }@${ DB_HOST }:${ DB_PORT }/${ DB_NAME }`;

const sequelize = new Sequelize(DB_URI, {
  logging: (message) => pinoLogger.debug(message),
});

const User = createUserModel(sequelize, Sequelize.DataTypes);
const Category = createCategoryModel(sequelize, Sequelize.DataTypes);
const Article = createArticleModel(sequelize, Sequelize.DataTypes);
const Comment = createCommentModel(sequelize, Sequelize.DataTypes);

createCategoryAssociations({Article, Category});
createArticleAssociations({Article, Category, User});
createCommentAssociations({Comment, Article, User});

module.exports = {
  models: {
    User,
    Category,
    Article,
    Comment,
  },
  sequelize,
};
