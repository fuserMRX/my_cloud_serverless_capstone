import * as AWS from 'aws-sdk';
const AWSXRay = require('aws-xray-sdk');
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { createLogger } from '../utils/logger';

const XAWS = AWSXRay.captureAWS(AWS);

const logger = createLogger('WouldYouRatherAccess');
export class WouldYouRatherAccess {

    constructor(
        private readonly docClient: DocumentClient = createDynamoDBClient(),
        private readonly usersTable = process.env.USERS_TABLE,
        private readonly questionsTable = process.env.QUESTIONS_TABLE,
        private readonly bucket = process.env.ATTACHMENT_S3_BUCKET,
        private readonly S3 = new XAWS.S3({
            signatureVersion: 'v4'
        }),
        private readonly urlExp = +process.env.SIGNED_URL_EXPIRATION) {
    }

    async getUsersForAuthorizedUser(userId) {
        console.log('Getting all users');

        const result = await this.docClient.scan({
            TableName: this.usersTable,
        }, (err, data) => {
            if (err) console.log(err);
            else console.log(data);
        }).promise();

        const users = result.Items;
        logger.info('All users results', JSON.stringify(users));

        return users;
    }

    async getQuestionsForAuthorizedUser(userId) {
        console.log('Getting all questions');

        const result = await this.docClient.scan({
            TableName: this.questionsTable,
        }, (err, data) => {
            if (err) console.log(err);
            else console.log(data);
        }).promise();

        const questions = result.Items;
        logger.info('All questions results', JSON.stringify(questions));

        return questions;
    }

    async getAuthorizedUserInfo(userId) {
        console.log('Getting authorized user info');
        console.log('USERID ==> ', userId);

        const result = await this.docClient.query({
            TableName: this.usersTable,
            IndexName: 'CreatedAtIndex',
            KeyConditionExpression: 'id = :id',
            ExpressionAttributeValues: {
                ':id': userId
            },
        }, (err, data) => {
            if (err) console.log(err);
            else console.log(data);
        }).promise();

        const userInfo = result.Items;
        logger.info('Authed user info results', JSON.stringify(userInfo));

        return userInfo;
    }

    async createUpdateUser(userItem) {
        logger.info('CreateUpdate User', JSON.stringify(userItem));
        await this.docClient.put({
            TableName: this.usersTable,
            Item: userItem
        }).promise();

        return userItem;
    }

    async createQuestion(question) {
        logger.info('Create Question', JSON.stringify(question));
        await this.docClient.put({
            TableName: this.questionsTable,
            Item: question
        }).promise();

        return question;
    }

    async updateQuestion({ qid, userId, updateQuestionItem }) {
        const { optionOne, optionTwo, author } = updateQuestionItem;
        await this.docClient.update({
            TableName: this.questionsTable,
            Key: { id: qid, author },
            ExpressionAttributeNames: { '#N': 'optionOne' },
            UpdateExpression: 'set #N = :optionOne, optionTwo = :optionTwo',
            ExpressionAttributeValues: {
                ':optionOne': optionOne,
                ':optionTwo': optionTwo
            },
        }).promise();

        return updateQuestionItem;
    }

    async updateUserInfo({ userId, updateUserItem }) {
        logger.info('updateUserItem ==========>', JSON.stringify(updateUserItem));
        logger.info('userId ==========>', userId);
        const { answers, questions, email } = updateUserItem;
        await this.docClient.update({
            TableName: this.usersTable,
            Key: { id: userId, email },
            ExpressionAttributeNames: { '#N': 'answers' },
            UpdateExpression: 'set #N = :answers, questions = :questions',
            ExpressionAttributeValues: {
                ':answers': answers,
                ':questions': questions
            },
        }).promise();

        return updateUserItem;
    }

    async deleteQuestion({ userId, qid }) {
        const deletedQuestion = await this.docClient.delete({
            TableName: this.questionsTable,
            Key: { id: qid, author: userId }
        }).promise();

        return { Deleted: deletedQuestion, qid };
    }

    async generateUploadUrl(userId, userEmail) {
        const uploadUrl = this.S3.getSignedUrl('putObject', {
            Bucket: this.bucket,
            Key: userId,
            Expires: this.urlExp
        });

        await this.docClient.update({
            TableName: this.usersTable,
            Key: { id: userId, email: userEmail },
            UpdateExpression: 'set avatarURL = :avatarURL',
            ExpressionAttributeValues: {
                ":avatarURL": uploadUrl.split("?")[0]
            },
            ReturnValues: 'UPDATED_NEW'
        }).promise();

        return uploadUrl;
    }
}

function createDynamoDBClient() {
    if (process.env.IS_OFFLINE) {
        console.log('Creating a local DynamoDB instance');
        return new XAWS.DynamoDB.DocumentClient({
            region: 'localhost',
            endpoint: 'http://localhost:8000',
        })
    }

    return new XAWS.DynamoDB.DocumentClient();
}