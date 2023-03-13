import 'source-map-support/register';

const express = require('express');
const serverlessExpress = require('@vendia/serverless-express');
const app = express();

import { createLogger } from '../../utils/logger';
import { getAuthorizedUserInfo } from '../../businessLogic/todos';
import { getUserId } from '../utils';

const logger = createLogger('getUserInfo');

app.get('/userInfo', async (req, res) => {
  const { event, context } = serverlessExpress.getCurrentInvoke();

  logger.info(`GetUser info about event ==> ${JSON.stringify(event)}`);
  logger.info(`GetUser info about context ==> ${JSON.stringify(context)}`);

  const userId = getUserId(event);
  const userInfo = await getAuthorizedUserInfo(userId);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);

  res.json({
    userInfo
  });

});

exports.handler = serverlessExpress({ app });