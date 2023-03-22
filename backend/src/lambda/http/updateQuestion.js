const express = require('express');
const serverlessExpress = require('@vendia/serverless-express');

import 'source-map-support/register';
import { createLogger } from '../../utils/logger';
import { updateQuestion } from '../../businessLogic/wouldYouRatherLogic';
import { getUserId } from '../utils';

const app = express();
const logger = createLogger('updateQuestion');

app.patch('/questions/:qid', async (req, res) => {
    const { event, context } = serverlessExpress.getCurrentInvoke();

    logger.info(`UpdateQuestion event info => ${JSON.stringify(event)}`);
    logger.info(`UpdateQuestion context info => ${JSON.stringify(context)}`);
    let item = null;

    const { qid } = req.params;

    const userId = getUserId(event);

    try {
        const updateQuestionItem = JSON.parse(event.body);
        logger.info(`UpdateQuestion parsed info => ${JSON.stringify(updateQuestionItem)}`);
        item = await updateQuestion({ qid, userId, updateQuestionItem});
    } catch(e) {
        logger.info(`UpdateQuestion: parse or update question error => ${e}`);
    }

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);

    res.json({
        item,
    });

});

exports.handler = serverlessExpress({ app });
