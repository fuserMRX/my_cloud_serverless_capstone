import 'source-map-support/register';

const express = require('express');
const serverlessExpress = require('@vendia/serverless-express');
const app = express();

import { createLogger } from '../../utils/logger';
import { getUserId } from '../utils';
import { createAttachmentPresignedUrl } from '../../businessLogic/todos';

const logger = createLogger('generateUploadUrl');

app.post('/todos/:todoId/attachment', async (req, res) => {
    const { event, context } = serverlessExpress.getCurrentInvoke();

    logger.info(`generateUploadUrl event info => ${JSON.stringify(event)}`);
    logger.info(`generateUploadUrl context info => ${JSON.stringify(context)}`);

    const { todoId } = req.params;

    const userId = getUserId(event);

    const uploadUrl = await createAttachmentPresignedUrl(userId, todoId);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);

    res.json({
        uploadUrl,
    });

});

exports.handler = serverlessExpress({ app });