import 'source-map-support/register';

const express = require('express');
const serverlessExpress = require('@vendia/serverless-express');
const app = express();

import { createLogger } from '../../utils/logger';
import { getUserId } from '../utils';
import { createAttachmentPresignedUrl } from '../../businessLogic/wouldYouRatherLogic';

const logger = createLogger('generateUploadUrl');

app.post('/users/attachment/:userEmail', async (req, res) => {
    const { event, context } = serverlessExpress.getCurrentInvoke();

    logger.info(`generateUploadUrl for avatar event info => ${JSON.stringify(event)}`);
    logger.info(`generateUploadUrl for avatar context info => ${JSON.stringify(context)}`);

    const { userEmail } = req.params;
    logger.info(`email ==> ${userEmail}`);

    const userId = getUserId(event);
    logger.info(`userId ==> ${userId}`);

    const uploadUrl = await createAttachmentPresignedUrl(userId, userEmail);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);

    res.json({
        uploadUrl,
    });

});

exports.handler = serverlessExpress({ app });