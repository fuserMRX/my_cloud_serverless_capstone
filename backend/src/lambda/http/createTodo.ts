import 'source-map-support/register';

import { createLogger } from '../../utils/logger';
import { CreateTodoRequest } from '../../requests/CreateTodoRequest';
import { getUserId } from '../utils';
import { createTodo } from '../../businessLogic/todos';

const express = require('express');
const serverlessExpress = require('@vendia/serverless-express');
const app = express();

const logger = createLogger('createTodo');


app.post('/todos', async (req, res) => {
  const { event, context } = serverlessExpress.getCurrentInvoke();

  logger.info(`CreateTodo event info => ${JSON.stringify(event)}`);
  logger.info(`CreateTodo context info => ${JSON.stringify(context)}`);

  const userId = getUserId(event);

  const newTodo: CreateTodoRequest = JSON.parse(event.body);
  const item = await createTodo(newTodo, userId);

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);

  res.json({
    item,
  });

});

exports.handler = serverlessExpress({ app });