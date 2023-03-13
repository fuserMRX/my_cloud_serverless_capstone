import 'source-map-support/register';

const express = require('express');
const serverlessExpress = require('@vendia/serverless-express');
const app = express();

import { createLogger } from '../../utils/logger';
import { getUsersForAuthorizedUser } from '../../businessLogic/todos';
import { getUserId } from '../utils';

const logger = createLogger('getUsers');

app.get('/users', async (req, res) => {
  const { event, context } = serverlessExpress.getCurrentInvoke();

  logger.info(`GetUsers info about event ==> ${JSON.stringify(event)}`);
  logger.info(`GetUsers info about context ==> ${JSON.stringify(context)}`);

  const userId = getUserId(event);
  const users = await getUsersForAuthorizedUser(userId);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);

  res.json({
    users,
  });

});

exports.handler = serverlessExpress({ app });