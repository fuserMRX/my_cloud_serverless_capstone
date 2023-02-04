const express = require('express');
const serverlessExpress = require('@vendia/serverless-express');

import 'source-map-support/register';
import { createLogger } from '../../utils/logger';
import { updateTodo } from '../../businessLogic/todos';
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest';
import { getUserId } from '../utils';

const app = express();
const logger = createLogger('updateTodo');

app.patch('/todos/:todoId', async (req, res) => {
    const { event, context } = serverlessExpress.getCurrentInvoke();

    logger.info(`UpdateTodo event info => ${JSON.stringify(event)}`);
    logger.info(`UpdateTodo context info => ${JSON.stringify(context)}`);

    const { todoId } = req.params;

    const userId = getUserId(event);

    const updateTodoItem: UpdateTodoRequest = JSON.parse(event.body);
    const item = await updateTodo(userId, todoId, updateTodoItem);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);

    res.json({
        item,
    });

});

exports.handler = serverlessExpress({ app });
