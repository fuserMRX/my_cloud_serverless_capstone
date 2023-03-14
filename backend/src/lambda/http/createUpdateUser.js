import 'source-map-support/register';

import { createLogger } from '../../utils/logger';
import { getUserId } from '../utils';
import { createUpdateUser } from '../../businessLogic/todos';

const express = require('express');
const serverlessExpress = require('@vendia/serverless-express');
const app = express();

const logger = createLogger('CreateUpdateUser');

app.put('/users', async (req, res) => {
    const { event, context } = serverlessExpress.getCurrentInvoke();

    logger.info(`CreateUser event info => ${JSON.stringify(event)}`);
    logger.info(`CreateUser context info => ${JSON.stringify(context)}`);

    const userId = getUserId(event);
    let newUser = null;

    try {
        newUser = JSON.parse(event.body);
        logger.info(`CreateUser parse result => ${newUser}`);
    } catch (e) {
        logger.info(`CreateUser json parse issue => ${e}`);
        return res.json({ "error": "Error with parsing a user" });
    }

    newUser.id = userId;
    const user = await createUpdateUser(newUser);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);

    res.json({
        user,
    });

});

exports.handler = serverlessExpress({ app });