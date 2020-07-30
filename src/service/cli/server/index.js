'use strict';

const {createServer} = require(`../../server`);
const {pinoLogger} = require(`../../logger`);
const {MODULE_NAME} = require(`./constants`);
const {API_SERVER_DEFAULT_PORT} = require(`../../../config`);

module.exports = {
  name: MODULE_NAME,
  async run(parameters) {
    const [customPort] = parameters;
    const port = Number.parseInt(customPort, 10) || API_SERVER_DEFAULT_PORT;

    try {
      const server = await createServer();

      server.listen(port, () => pinoLogger.info(`Принимаю подключения на ${ port }`))
      .on(`error`, (error) => pinoLogger.error(`Не могу запустить сервер. Ошибка: ${ error }`));
    } catch (error) {
      pinoLogger.error(`Не могу создать сервер. Ошибка: ${ error }`);
    }
  },
};
