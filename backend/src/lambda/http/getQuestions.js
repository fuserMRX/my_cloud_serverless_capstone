import 'source-map-support/register';

const express = require('express');
const serverlessExpress = require('@vendia/serverless-express');
const app = express();

import { createLogger } from '../../utils/logger';
import { getQuestionsForAuthorizedUser } from '../../businessLogic/wouldYouRatherLogic';
import { getUserId } from '../utils';

const logger = createLogger('getQuestions');

app.get('/questions', async (req, res) => {
  const { event, context } = serverlessExpress.getCurrentInvoke();

  logger.info(`GetQuestions info about event ==> ${JSON.stringify(event)}`);
  logger.info(`GetQuestions info about context ==> ${JSON.stringify(context)}`);

  const userId = getUserId(event);
  const questions = await getQuestionsForAuthorizedUser(userId);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);

  res.json({
    questions,
  });

});

exports.handler = serverlessExpress({ app });