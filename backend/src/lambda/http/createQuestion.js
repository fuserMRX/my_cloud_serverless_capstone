import 'source-map-support/register';

import { createLogger } from '../../utils/logger';
import { getUserId } from '../utils';
import { createQuestion } from '../../businessLogic/wouldYouRatherLogic';

const express = require('express');
const serverlessExpress = require('@vendia/serverless-express');
const app = express();

const logger = createLogger('createQuestion');


app.post('/questions', async (req, res) => {
    const { event, context } = serverlessExpress.getCurrentInvoke();

    logger.info(`CreateQuestion event info => ${JSON.stringify(event)}`);
    logger.info(`CreateQuestion context info => ${JSON.stringify(context)}`);

    const userId = getUserId(event);
    let newQuestion = null;

    try {
        newQuestion = JSON.parse(event.body);
        logger.info(`CreateQuestion parse result => ${newQuestion}`);
    } catch (e) {
        logger.info(`CreateQuestion json parse issue => ${e}`);
        return res.json({ "error": "Error with parsing a question" });
    }

    newQuestion.author = userId;

    const quesiton = await createQuestion(newQuestion);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);

    res.json({
        quesiton,
    });

});

exports.handler = serverlessExpress({ app });