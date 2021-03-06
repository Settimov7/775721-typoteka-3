'use strict';

const {createValues} = require(`../create-values`);

module.exports.createInsertCommand = ({tableName, entity, propertiesOrder}) => {
  const values = createValues(entity, propertiesOrder);

  return `--Add ${ tableName }\nINSERT INTO ${ tableName } VALUES\n${ values.join(`,\n`) };`;
};
