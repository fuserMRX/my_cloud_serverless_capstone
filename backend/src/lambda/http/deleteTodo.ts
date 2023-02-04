import 'source-map-support/register';

const express = require('express');
const serverlessExpress = require('@vendia/serverless-express');

import { deleteTodo } from '../../businessLogic/todos';
import { getUserId } from '../utils';
import { createLogger } from '../../utils/logger';

const logger = createLogger('deleteTodo');

const app = express();
app.use(express.json());

app.delete('/todos/:todoId', async (req, res) => {
    const { event } = serverlessExpress.getCurrentInvoke();

    logger.info(`DeleteTodo event info => ${JSON.stringify(event)}`);

    const { todoId } = req.params;
  
    const userId = getUserId(event);
  
    const item = await deleteTodo(userId, todoId);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    res.json({
      item,
    });
  
  });
  
exports.handler = serverlessExpress({ app });
