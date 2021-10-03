import { config } from 'dotenv';
import path from 'path';

import { CollectionNames, Common } from '../constants';
import { logger } from '../olyn/logger';
import { makeUser } from '../v1/entities/user';
import defaultUserGen from './config/default-user';
import { MongoHelper } from './external/repositories/mongodb/helpers/mongo-helper';

const start = async () => {
  try {
    config({
      path: path.resolve(
        process.cwd(),
        `.env.${process.env.TS_NODE_DEV ? 'development' : 'production'}`
      ),
    });

    await MongoHelper.connect();

    // Create default admin user IF NOT EXISTS
    const defaultUser = await defaultUserGen();
    await MongoHelper.getCollection(CollectionNames.Users).updateOne(
      { [Common.Id]: defaultUser.id },
      { $set: makeUser(defaultUser, defaultUser.id) },
      {
        upsert: true,
      }
    );

    const { default: app, io } = await import('./config/app');

    const port = process.env.PORT ?? 3333;

    io.on('connect', socket => {
      logger.info(`New Connection::>> ${socket.id}`);
    });

    app.listen(port, () =>
      logger.info(`Server running at ${process.env.URL_ROOT ?? 'http://localhost'}:${port}`)
    );
  } catch (error) {
    logger.error(error);
  }
};

start().then();

process.on('uncaughtException', err => {
  logger.error(`${new Date().toUTCString()} uncaughtException:`, err.message);
  logger.error(err.stack ?? '');
  process.exit(1);
});
