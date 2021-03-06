'use strict';

module.exports.fillDataBase = async ({dataBase, mocks = {}}) => {
  const {sequelize, models} = dataBase;
  const {User, Category, Article, Comment, RefreshToken} = models;
  const {users = [], categories = [], articles = [], comments = [], articlesCategories = [], tokens = []} = mocks;

  try {
    await sequelize.sync({force: true});

    await User.bulkCreate(users);
    await sequelize.query(`ALTER SEQUENCE users_id_seq RESTART`);
    await sequelize.query(`UPDATE users SET id = DEFAULT`);

    const sortedCategories = categories.sort((categoryA, categoryB) => categoryA.id - categoryB.id);
    await Category.bulkCreate(sortedCategories);
    await sequelize.query(`ALTER SEQUENCE categories_id_seq RESTART`);
    await sequelize.query(`UPDATE categories SET id = DEFAULT`);

    await Article.bulkCreate(articles);
    await sequelize.query(`ALTER SEQUENCE articles_id_seq RESTART`);
    await sequelize.query(`UPDATE articles SET id = DEFAULT`);

    await Comment.bulkCreate(comments);
    await sequelize.query(`ALTER SEQUENCE comments_id_seq RESTART`);
    await sequelize.query(`UPDATE comments SET id = DEFAULT`);

    await RefreshToken.bulkCreate(tokens);

    const addCategoryPromises = articlesCategories.map(async ({articleId, categoriesIds}) => {
      const article = await Article.findByPk(articleId);
      const articleCategories = await Category.findAll({
        where: {
          id: {
            [sequelize.Sequelize.Op.or]: categoriesIds,
          },
        },
      });

      await article.addCategories(articleCategories);
    });

    await Promise.all(addCategoryPromises);
  } catch (error) {
    console.log(`Не могу заполнить базу данных. Ошибка: ${ error }`);
  }
};
