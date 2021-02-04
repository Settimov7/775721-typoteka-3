'use strict';

const Joi = require(`joi`);

const {CategoryTitleRequirements} = require(`../database/models/category/constants`);

exports.categoryDataSchema = Joi.object({
  title: Joi.string()
    .min(CategoryTitleRequirements.length.MIN)
    .max(CategoryTitleRequirements.length.MAX)
    .required(),
});
