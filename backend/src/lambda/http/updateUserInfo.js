const express = require('express');
const serverlessExpress = require('@vendia/serverless-express');

import 'source-map-support/register';
import { createLogger } from '../../utils/logger';
import { updateUserInfo } from '../../businessLogic/todos';
import { getUserId } from '../utils';

const app = express();
const logger = createLogger('UpdateUserInfo');

app.patch('/users/:userId', async (req, res) => {
    const { event, context } = serverlessExpress.getCurrentInvoke();

    logger.info(`UpdateUserInfo event info => ${JSON.stringify(event)}`);
    logger.info(`UpdateUserInfo context info => ${JSON.stringify(context)}`);
    let updatedUser = null;

    const { userId: paramsUserId } = req.params;
    const decodedUserId = decodeURI(paramsUserId);
    logger.info(`UpdateUserInfo decoded userId => ${decodedUserId}`);

    const userId = getUserId(event);

    // security check if id is the same with a registered user
    if ((decodedUserId + '') === (userId + '')) {
        try {
            const updateUserItem = JSON.parse(event.body);
            logger.info(`UpdateUserInfo parsed info => ${JSON.stringify(updateUserItem)}`);
            updatedUser = await updateUserInfo({ userId, updateUserItem });
        } catch (e) {
            logger.info(`UpdateUserInfo: parse or update user error => ${e}`);
        }

        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Credentials', true);
    }

    res.json({
        updatedUser,
    });

});

exports.handler = serverlessExpress({ app });
