import 'source-map-support/register';

const express = require('express');
const serverlessExpress = require('@vendia/serverless-express');

import { deleteQuestion } from '../../businessLogic/wouldYouRatherLogic';
import { getUserId } from '../utils';
import { createLogger } from '../../utils/logger';

const logger = createLogger('deleteQuestion');

const app = express();

app.delete('/questions/:qid', async (req, res) => {
    const { event } = serverlessExpress.getCurrentInvoke();

    logger.info(`DeleteQuestion event info => ${JSON.stringify(event)}`);

    const { qid } = req.params;
  
    const userId = getUserId(event);
  
    const deletedQuestion = await deleteQuestion({userId, qid});

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    res.json({
        deletedQuestion,
    });
  
  });
  
exports.handler = serverlessExpress({ app });
